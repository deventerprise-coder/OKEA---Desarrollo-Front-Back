import React from "react";
import { useTheme } from "./ThemeContext";

const TechnicalSpecifications = ({ specifications }) => {
  const { isLight } = useTheme();

  const borderColor = isLight ? "#FFFFFF" : "#120F31";

  const getTableStyle = () => ({
    backgroundColor: isLight ? '#ffffff' : '#2a2a4a',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'all 0.3s ease'
  });

  const getRowStyle = (index) => ({
    backgroundColor: index % 2 === 0 
      ? (isLight ? '#AFBDDD' : '#242249') 
      : (isLight ? '#AFBDDD' : '#242249'),
    color: isLight ? '#001947' : '#E2E2E9',
    transition: 'all 0.3s ease'
  });

  const getValueStyle = () => ({
    backgroundColor: isLight ? '#FAF9FB' : '#3E3B6B',
    color: isLight ? '#001947' : '#E2E2E9',
    transition: 'all 0.3s ease'
  });

  return (
    <div className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[512px] lg:max-w-[784px]">
      <div style={getTableStyle()}>
        <table className="w-full border-collapse">
          <tbody>
            {specifications.map((spec, index) => (
              <tr
                key={index}
                style={{ borderBottom: `2px solid ${borderColor}` }}
              >
                <td
                  className="px-2 sm:px-4 md:px-6 py-4 font-medium text-center w-2/5 text-xs sm:text-sm md:text-base"
                  style={{
                    ...getRowStyle(index),
                    borderRight: `2px solid ${borderColor}`
                  }}
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