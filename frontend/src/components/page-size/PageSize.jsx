import React, { useState, useEffect, useRef } from "react";
import "./PageSize.css";
import ArrowDown from '../../assets/flecha-hacia-abajo.png';

export default function PageSize({ onPageSizeSelection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPageSize, setSelectedPageSize] = useState("20");
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePageSizeSelection = (pageSize) => {
    setSelectedPageSize(pageSize);
    onPageSizeSelection(pageSize);
    setIsOpen(false);
  };

  return (
    <div className="PageSize_total">
      <div className={`PageSize_dropdown ${isOpen ? "open" : ""}`} ref={dropdownRef}>
        <div className="PageSize_dropdown_dropdown_button" onClick={handleToggleDropdown}>
          {selectedPageSize}
          <img src={ArrowDown} alt="Arrow down" />
        </div>
        {isOpen && (
          <div className="PageSize_dropdown_content">
            <div
              className="PageSize_dropdown_item"
              onClick={() => handlePageSizeSelection("20")}
            >
              20
            </div>
            <div
              className="PageSize_dropdown_item"
              onClick={() => handlePageSizeSelection("30")}
            >
              30
            </div>
            <div
              className="PageSize_dropdown_item"
              onClick={() => handlePageSizeSelection("40")}
            >
              40
            </div>
            <div
              className="PageSize_dropdown_item"
              onClick={() => handlePageSizeSelection("40")}
            >
              50
            </div>
            <div
              className="PageSize_dropdown_item"
              onClick={() => handlePageSizeSelection("40")}
            >
              60
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
