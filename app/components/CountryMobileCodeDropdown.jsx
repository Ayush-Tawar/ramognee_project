import React from "react";

function CountryMobileCodeDropdown({ countryMobileCodes, selectedCode, onChange }) {
  return (
    <div className="flex flex-col">
      <label>Mobile Code:</label>
      <select
        className="border-2 rounded p-1"
        name="mobileCode"
        value={selectedCode}
        onChange={onChange}
      >
        <option value="">Select a mobile code</option>
        {countryMobileCodes.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountryMobileCodeDropdown;
