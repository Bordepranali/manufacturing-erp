import { useState } from "react";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Globe,
  CalendarDays,
  Save,
  RotateCcw,
  Upload,
} from "lucide-react";

function CompanySettings() {
  const [form, setForm] = useState({
    companyName: "ManufactureX Industries",
    companyCode: "MFG001",
    industry: "Manufacturing",
    email: "admin@manufacturex.com",
    phone: "+91 98765 43210",
    website: "",
    address: "MIDC Industrial Area",
    city: "Ahmednagar",
    state: "Maharashtra",
    pincode: "414001",
    gst: "27ABCDE1234F1Z5",
    pan: "ABCDE1234F",
    currency: "INR - Indian Rupee",
    dateFormat: "DD/MM/YYYY",
    timezone: "Asia/Kolkata",
    fiscalYear: "April - March",
  });

  const [logo, setLogo] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setSaved(false);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setLogo(URL.createObjectURL(file));
      setSaved(false);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  const handleReset = () => {
    setForm({
      companyName: "ManufactureX Industries",
      companyCode: "MFG001",
      industry: "Manufacturing",
      email: "admin@manufacturex.com",
      phone: "+91 98765 43210",
      website: "",
      address: "MIDC Industrial Area",
      city: "Ahmednagar",
      state: "Maharashtra",
      pincode: "414001",
      gst: "27ABCDE1234F1Z5",
      pan: "ABCDE1234F",
      currency: "INR - Indian Rupee",
      dateFormat: "DD/MM/YYYY",
      timezone: "Asia/Kolkata",
      fiscalYear: "April - March",
    });

    setLogo(null);
    setSaved(false);
  };

  return (
    <div className="page-container company-settings-page">
      <div className="page-header">
        <div>
          <span className="page-eyebrow">SETTINGS</span>
          <h1>Company Settings</h1>
          <p>
            Manage your company information and ERP preferences.
          </p>
        </div>

        <div className="company-settings-actions">
          <button
            type="button"
            className="secondary-action"
            onClick={handleReset}
          >
            <RotateCcw size={17} />
            Reset
          </button>

          <button
            type="submit"
            form="company-settings-form"
            className="primary-action"
          >
            <Save size={17} />
            Save Changes
          </button>
        </div>
      </div>

      {saved && (
        <div className="settings-success">
          Company settings saved successfully.
        </div>
      )}

      <form id="company-settings-form" onSubmit={handleSave}>
        <div className="settings-grid">
          <section className="settings-card">
            <div className="settings-card-header">
              <div className="settings-icon">
                <Building2 size={19} />
              </div>

              <div>
                <h2>Company Information</h2>
                <p>Basic information about your organization.</p>
              </div>
            </div>

            <div className="settings-form-grid">
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Company Code</label>
                <input
                  type="text"
                  name="companyCode"
                  value={form.companyCode}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Industry</label>
                <select
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                >
                  <option>Manufacturing</option>
                  <option>Automotive</option>
                  <option>Engineering</option>
                  <option>Textile</option>
                  <option>Food Processing</option>
                  <option>Pharmaceutical</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Email</label>

                <div className="input-with-icon">
                  <Mail size={17} />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Phone</label>

                <div className="input-with-icon">
                  <Phone size={17} />

                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Website</label>

                <div className="input-with-icon">
                  <Globe size={17} />

                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="www.example.com"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="settings-card">
            <div className="settings-card-header">
              <div className="settings-icon">
                <MapPin size={19} />
              </div>

              <div>
                <h2>Business Address</h2>
                <p>Company location and contact address.</p>
              </div>
            </div>

            <div className="settings-form-grid">
              <div className="form-group full-width">
                <label>Address</label>

                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>City</label>

                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>State</label>

                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Pincode</label>

                <input
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          <section className="settings-card">
            <div className="settings-card-header">
              <div className="settings-icon">
                <FileText size={19} />
              </div>

              <div>
                <h2>Tax & Registration</h2>
                <p>Business registration details.</p>
              </div>
            </div>

            <div className="settings-form-grid">
              <div className="form-group">
                <label>GST Number</label>

                <input
                  type="text"
                  name="gst"
                  value={form.gst}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>PAN Number</label>

                <input
                  type="text"
                  name="pan"
                  value={form.pan}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          <section className="settings-card">
            <div className="settings-card-header">
              <div className="settings-icon">
                <CalendarDays size={19} />
              </div>

              <div>
                <h2>System Preferences</h2>
                <p>Configure common ERP preferences.</p>
              </div>
            </div>

            <div className="settings-form-grid">
              <div className="form-group">
                <label>Currency</label>

                <select
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                >
                  <option>INR - Indian Rupee</option>
                  <option>USD - US Dollar</option>
                  <option>EUR - Euro</option>
                  <option>GBP - British Pound</option>
                </select>
              </div>

              <div className="form-group">
                <label>Date Format</label>

                <select
                  name="dateFormat"
                  value={form.dateFormat}
                  onChange={handleChange}
                >
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>

              <div className="form-group">
                <label>Time Zone</label>

                <select
                  name="timezone"
                  value={form.timezone}
                  onChange={handleChange}
                >
                  <option>Asia/Kolkata</option>
                  <option>UTC</option>
                  <option>Asia/Dubai</option>
                  <option>Europe/London</option>
                </select>
              </div>

              <div className="form-group">
                <label>Fiscal Year</label>

                <select
                  name="fiscalYear"
                  value={form.fiscalYear}
                  onChange={handleChange}
                >
                  <option>April - March</option>
                  <option>January - December</option>
                  <option>July - June</option>
                </select>
              </div>
            </div>
          </section>

          <section className="settings-card logo-card">
            <div className="settings-card-header">
              <div className="settings-icon">
                <Upload size={19} />
              </div>

              <div>
                <h2>Company Logo</h2>
                <p>Upload your company's logo.</p>
              </div>
            </div>

            <div className="logo-upload-area">
              <div className="company-logo-preview">
                {logo ? (
                  <img src={logo} alt="Company logo" />
                ) : (
                  <Building2 size={34} />
                )}
              </div>

              <div>
                <label className="upload-button">
                  <Upload size={16} />
                  Choose Logo

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    hidden
                  />
                </label>

                <p>PNG, JPG or WEBP recommended.</p>
              </div>
            </div>
          </section>
        </div>
      </form>
    </div>
  );
}

export default CompanySettings;