import React from 'react';
import { Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, loading, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
     
        className="bg-white rounded-lg shadow-xl w-1/2 min-w-[300px] border border-gray-200 overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
     
        <div className="p-6 pb-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{title || "Confirm Delete"}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {description || "Are you sure you want to delete this item? This action cannot be undone."}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={loading}
            className="bg-white hover:bg-gray-100 text-gray-700"
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white min-w-[100px]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;