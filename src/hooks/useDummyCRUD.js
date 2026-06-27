import { useState, useCallback } from 'react';
import { toast } from 'sonner';

// A generic hook to simulate CRUD operations with a delay
export function useDummyCRUD(initialData) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  // Read
  const refresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Data refreshed successfully");
    }, 600);
  }, []);

  // Create
  const addRecord = (newRecord) => {
    setLoading(true);
    setTimeout(() => {
      const recordWithId = { ...newRecord, id: `r_${Date.now()}` };
      setData((prev) => [recordWithId, ...prev]);
      setLoading(false);
      toast.success("Record added successfully");
    }, 600);
  };

  // Update
  const updateRecord = (id, updatedFields) => {
    setLoading(true);
    setTimeout(() => {
      setData((prev) => 
        prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
      );
      setLoading(false);
      toast.success("Record updated successfully");
    }, 600);
  };

  // Delete
  const deleteRecord = (id) => {
    setLoading(true);
    setTimeout(() => {
      setData((prev) => prev.filter((item) => item.id !== id));
      setLoading(false);
      toast.success("Record deleted successfully");
    }, 600);
  };

  // Toggle Status
  const toggleStatus = (id) => {
    setLoading(true);
    setTimeout(() => {
      setData((prev) => 
        prev.map((item) => {
          if (item.id === id) {
            const newStatus = item.status === 'Active' ? 'Inactive' : 'Active';
            toast.success(`Status changed to ${newStatus}`);
            return { ...item, status: newStatus };
          }
          return item;
        })
      );
      setLoading(false);
    }, 400);
  };

  return {
    data,
    loading,
    refresh,
    addRecord,
    updateRecord,
    deleteRecord,
    toggleStatus
  };
}
