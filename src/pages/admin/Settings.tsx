import { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  ShieldCheck,
  CreditCard,
  CalendarDays,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

type Tab =
  | "general"
  | "profile"
  | "notifications"
  | "security"
  | "payments"
  | "booking";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>("general");

  const [platformName, setPlatformName] = useState("PRAPT");
  const [supportEmail, setSupportEmail] =
    useState("support@prapt.com");
  const [currency, setCurrency] = useState("INR");

  const [adminName, setAdminName] = useState("Admin");
  const [adminEmail, setAdminEmail] =
    useState("admin@prapt.com");

  const [showPassword, setShowPassword] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [eventNotifications, setEventNotifications] = useState(true);
  const [securityNotifications, setSecurityNotifications] = useState(true);

  const [paymentMode, setPaymentMode] = useState<"Test" | "Live">("Test");
  const [autoRefund, setAutoRefund] = useState(false);

  const [bookingApproval, setBookingApproval] = useState(true);
  const [allowCancellation, setAllowCancellation] = useState(true);

  const tabs = [
    {
      id: "general" as Tab,
      label: "General",
      icon: SettingsIcon,
      description: "Platform configuration",
    },
    {
      id: "profile" as Tab,
      label: "Admin Profile",
      icon: User,
      description: "Manage admin account",
    },
    {
      id: "notifications" as Tab,
      label: "Notifications",
      icon: Bell,
      description: "Notification preferences",
    },
    {
      id: "security" as Tab,
      label: "Security",
      icon: ShieldCheck,
      description: "Password and security",
    },
    {
      id: "payments" as Tab,
      label: "Payments",
      icon: CreditCard,
      description: "Razorpay configuration",
    },
    {
      id: "booking" as Tab,
      label: "Booking",
      icon: CalendarDays,
      description: "Booking preferences",
    },
  ];

  const Toggle = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: (value: boolean) => void;
  }) => (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition ${
        checked ? "bg-black" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
          checked ? "left-6" : "left-1"
        }`}
      />
    </button>
  );

  const SaveButton = () => (
    <button
      type="button"
      onClick={() => alert("Settings saved successfully (demo only).")}
      className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
    >
      <Save size={16} />
      Save Changes
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f7f7f8]">
      <AdminSidebar />

      <div className="min-h-screen lg:ml-[274px]">
        <AdminHeader
          title="Settings"
          subtitle="Manage your PRAPT platform and admin preferences."
        />

        <main className="p-5 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            {/* SETTINGS NAV */}
            <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
              <div className="mb-3 px-3 py-2">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Settings
                </p>
              </div>

              <div className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                        active
                          ? "bg-black text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                          active ? "bg-white/10" : "bg-gray-100"
                        }`}
                      >
                        <Icon size={17} />
                      </div>

                      <div>
                        <p className="text-sm font-bold">
                          {tab.label}
                        </p>
                        <p
                          className={`mt-0.5 text-[11px] ${
                            active
                              ? "text-gray-300"
                              : "text-gray-400"
                          }`}
                        >
                          {tab.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* SETTINGS CONTENT */}
            <section className="min-w-0">
              {/* GENERAL */}
              {activeTab === "general" && (
                <div className="space-y-6">
                  <SettingsCard
                    title="Platform Settings"
                    description="Basic information about your event booking platform."
                  >
                    <div className="grid gap-5 md:grid-cols-2">
                      <InputField
                        label="Platform Name"
                        value={platformName}
                        onChange={setPlatformName}
                      />

                      <InputField
                        label="Support Email"
                        type="email"
                        value={supportEmail}
                        onChange={setSupportEmail}
                      />

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Currency
                        </label>

                        <select
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
                        >
                          <option value="INR">INR — Indian Rupee</option>
                          <option value="USD">USD — US Dollar</option>
                          <option value="EUR">EUR — Euro</option>
                        </select>
                      </div>

                      <InputField
                        label="Timezone"
                        value="Asia/Kolkata"
                        onChange={() => {}}
                        disabled
                      />
                    </div>
                  </SettingsCard>

                  <SettingsCard
                    title="Platform Status"
                    description="Control the availability of your public platform."
                  >
                    <SettingRow
                      title="Website Status"
                      description="PRAPT is currently available to customers."
                      right={
                        <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700">
                          Online
                        </span>
                      }
                    />

                    <SettingRow
                      title="Maintenance Mode"
                      description="Temporarily disable customer access."
                      right={
                        <Toggle
                          checked={false}
                          onChange={() => {}}
                        />
                      }
                    />
                  </SettingsCard>

                  <div className="flex justify-end">
                    <SaveButton />
                  </div>
                </div>
              )}

              {/* PROFILE */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <SettingsCard
                    title="Admin Profile"
                    description="Update the information associated with the admin account."
                  >
                    <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-xl font-black text-white">
                        A
                      </div>

                      <div>
                        <p className="font-bold text-gray-950">
                          {adminName}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Super Administrator
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                      <InputField
                        label="Full Name"
                        value={adminName}
                        onChange={setAdminName}
                      />

                      <InputField
                        label="Email Address"
                        type="email"
                        value={adminEmail}
                        onChange={setAdminEmail}
                      />

                      <InputField
                        label="Role"
                        value="Super Administrator"
                        onChange={() => {}}
                        disabled
                      />

                      <InputField
                        label="Account Status"
                        value="Active"
                        onChange={() => {}}
                        disabled
                      />
                    </div>
                  </SettingsCard>

                  <div className="flex justify-end">
                    <SaveButton />
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS */}
              {activeTab === "notifications" && (
                <SettingsCard
                  title="Notification Preferences"
                  description="Choose which notifications the admin should receive."
                >
                  <div className="divide-y divide-gray-100">
                    <SettingRow
                      title="Email Notifications"
                      description="Receive important platform updates via email."
                      right={
                        <Toggle
                          checked={emailNotifications}
                          onChange={setEmailNotifications}
                        />
                      }
                    />

                    <SettingRow
                      title="New Order Notifications"
                      description="Get notified whenever a new ticket order is placed."
                      right={
                        <Toggle
                          checked={orderNotifications}
                          onChange={setOrderNotifications}
                        />
                      }
                    />

                    <SettingRow
                      title="Event Notifications"
                      description="Receive updates about newly created or updated events."
                      right={
                        <Toggle
                          checked={eventNotifications}
                          onChange={setEventNotifications}
                        />
                      }
                    />

                    <SettingRow
                      title="Security Alerts"
                      description="Receive alerts about login and account security."
                      right={
                        <Toggle
                          checked={securityNotifications}
                          onChange={setSecurityNotifications}
                        />
                      }
                    />
                  </div>

                  <div className="mt-6 flex justify-end">
                    <SaveButton />
                  </div>
                </SettingsCard>
              )}

              {/* SECURITY */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <SettingsCard
                    title="Change Password"
                    description="Update the password used to access the admin portal."
                  >
                    <div className="space-y-5">
                      <PasswordField
                        label="Current Password"
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                      />

                      <PasswordField
                        label="New Password"
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                      />

                      <PasswordField
                        label="Confirm New Password"
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                      />
                    </div>
                  </SettingsCard>

                  <SettingsCard
                    title="Account Security"
                    description="Additional security controls for the admin account."
                  >
                    <SettingRow
                      title="Two-Factor Authentication"
                      description="Add an extra layer of protection to your account."
                      right={
                        <Toggle
                          checked={false}
                          onChange={() => {}}
                        />
                      }
                    />

                    <SettingRow
                      title="Login Alerts"
                      description="Notify the admin when a new login occurs."
                      right={
                        <Toggle
                          checked={securityNotifications}
                          onChange={setSecurityNotifications}
                        />
                      }
                    />
                  </SettingsCard>

                  <div className="flex justify-end">
                    <SaveButton />
                  </div>
                </div>
              )}

              {/* PAYMENTS */}
              {activeTab === "payments" && (
                <div className="space-y-6">
                  <SettingsCard
                    title="Razorpay Configuration"
                    description="Configure the payment gateway used for ticket purchases."
                  >
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-bold text-gray-950">
                            Razorpay
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            Payment gateway integration
                          </p>
                        </div>

                        <span className="rounded-full bg-gray-200 px-3 py-1.5 text-xs font-bold text-gray-600">
                          Not Connected
                        </span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="mb-3 text-sm font-semibold text-gray-700">
                        Gateway Mode
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        {(["Test", "Live"] as const).map((mode) => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => setPaymentMode(mode)}
                            className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                              paymentMode === mode
                                ? "border-black bg-black text-white"
                                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {mode} Mode
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 grid gap-5 md:grid-cols-2">
                      <InputField
                        label="Razorpay Key ID"
                        placeholder="Enter Key ID"
                      />

                      <InputField
                        label="Razorpay Secret"
                        type="password"
                        placeholder="Enter Secret"
                      />
                    </div>

                    <div className="mt-5">
                      <SettingRow
                        title="Automatic Refunds"
                        description="Allow eligible cancelled orders to be automatically refunded."
                        right={
                          <Toggle
                            checked={autoRefund}
                            onChange={setAutoRefund}
                          />
                        }
                      />
                    </div>
                  </SettingsCard>

                  <div className="flex justify-end">
                    <SaveButton />
                  </div>
                </div>
              )}

              {/* BOOKING */}
              {activeTab === "booking" && (
                <div className="space-y-6">
                  <SettingsCard
                    title="Booking Settings"
                    description="Configure how customers purchase and manage tickets."
                  >
                    <SettingRow
                      title="Allow New Bookings"
                      description="Customers can purchase tickets for available events."
                      right={
                        <Toggle
                          checked={bookingApproval}
                          onChange={setBookingApproval}
                        />
                      }
                    />

                    <SettingRow
                      title="Allow Ticket Cancellation"
                      description="Customers can request cancellation for eligible orders."
                      right={
                        <Toggle
                          checked={allowCancellation}
                          onChange={setAllowCancellation}
                        />
                      }
                    />

                    <SettingRow
                      title="QR Ticket Generation"
                      description="Generate a unique QR code after successful payment."
                      right={
                        <Toggle
                          checked={true}
                          onChange={() => {}}
                        />
                      }
                    />

                    <SettingRow
                      title="Email Ticket Delivery"
                      description="Send digital tickets to customers after successful booking."
                      right={
                        <Toggle
                          checked={true}
                          onChange={() => {}}
                        />
                      }
                    />
                  </SettingsCard>

                  <SettingsCard
                    title="Booking Limits"
                    description="Default limits for customer bookings."
                  >
                    <div className="grid gap-5 md:grid-cols-2">
                      <InputField
                        label="Maximum Tickets Per Order"
                        value="10"
                        onChange={() => {}}
                      />

                      <InputField
                        label="Booking Hold Time"
                        value="10 minutes"
                        onChange={() => {}}
                      />
                    </div>
                  </SettingsCard>

                  <div className="flex justify-end">
                    <SaveButton />
                  </div>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- REUSABLE COMPONENTS ---------- */

function SettingsCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
      <div className="border-b border-gray-100 pb-5">
        <h2 className="text-lg font-black text-gray-950">
          {title}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      </div>

      <div className="pt-6">{children}</div>
    </div>
  );
}

function InputField({
  label,
  value = "",
  onChange = () => {},
  type = "text",
  placeholder,
  disabled = false,
}: {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black ${
          disabled
            ? "cursor-not-allowed bg-gray-50 text-gray-400"
            : "bg-white"
        }`}
      />
    </div>
  );
}

function PasswordField({
  label,
  showPassword,
  setShowPassword,
}: {
  label: string;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-sm outline-none transition focus:border-black"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>
    </div>
  );
}

function SettingRow({
  title,
  description,
  right,
}: {
  title: string;
  description: string;
  right: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-5 first:pt-0 last:pb-0">
      <div>
        <p className="text-sm font-bold text-gray-900">{title}</p>
        <p className="mt-1 max-w-xl text-sm leading-5 text-gray-500">
          {description}
        </p>
      </div>

      <div className="shrink-0">{right}</div>
    </div>
  );
}