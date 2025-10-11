import React from "react";
import { useTheme } from "./ThemeContext";

const TechnicalSpecifications = ({ specifications }) => {
  const { isLight } = useTheme();

  const getTableStyle = () => ({
    backgroundColor: isLight ? '#ffffff' : '#2a2a4a',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'all 0.3s ease'
  });

  const getRowStyle = (index) => ({
    backgroundColor: index % 2 === 0 
      ? (isLight ? '#AFBDDD' : '#4C1D95') 
      : (isLight ? '#AFBDDD' : '#5B21B6'),
    color: isLight ? '#001947' : '#E2E2E9',
    transition: 'all 0.3s ease'
  });

  const getValueStyle = () => ({
    backgroundColor: isLight ? '#FAF9FB' : '#374151',
    color: isLight ? '#001947' : '#E2E2E9',
    transition: 'all 0.3s ease'
  });

  return (
    <div className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[512px] lg:max-w-[784px]"> {/* Responsive */}
      <div style={getTableStyle()}>
        <table className="w-full border-collapse">
          <tbody>
            {specifications.map((spec, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td
                  className="px-2 sm:px-4 md:px-6 py-4 font-medium text-center border-r border-gray-300 w-2/5 text-xs sm:text-sm md:text-base"
                  style={getRowStyle(index)}
                >
                  {spec.label}
                </td>
                <td
                  className="px-2 sm:px-3 md:px-4 py-4 text-center w-3/5 text-xs sm:text-sm md:text-base"
                  style={getValueStyle()}
                >
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TechnicalSpecifications;