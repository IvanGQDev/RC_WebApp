import React, { useState } from "react";
import { Copy } from "lucide-react";

const IdCell = ({ id }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-600">{id}</span>
      <div className="relative">
        {copied && (
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded shadow-md">
            Copiado
          </span>
        )}
        <Copy
          className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-800 transition-colors"
          title="Copiar ID"
          onClick={handleCopy}
        />
      </div>
    </div>
  );
};

export default IdCell;
