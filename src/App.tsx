import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import EmployeeCard from './components/EmployeeCard';
import AdminDashboard from './components/AdminDashboard';
import type { Employee, Alert } from './types';

// Mock data for demonstration
const mockEmployee: Employee = {
  id: "EMP001",
  name: "John Doe",
  bloodType: "O+",
  department: "Engineering",
  emergencyContacts: [
    {
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "+1-555-0123"
    },
    {
      name: "James Doe",
      relationship: "Brother",
      phone: "+1-555-0124"
    }
  ],
  medicalConditions: ["Asthma", "Penicillin Allergy"],
  location: {
    lat: 40.7128,
    lng: -74.0060
  }
};

const mockAlerts: Alert[] = [
  {
    id: "ALERT001",
    employeeId: "EMP001",
    timestamp: new Date(),
    status: "active",
    location: {
      lat: 40.7128,
      lng: -74.0060
    }
  }
];

const mockEmployees: Employee[] = [mockEmployee];

function App() {
  const [alerts, setAlerts] = React.useState<Alert[]>(mockAlerts);

  const handleSOS = () => {
    const newAlert: Alert = {
      id: `ALERT${Math.random().toString(36).substr(2, 9)}`,
      employeeId: mockEmployee.id,
      timestamp: new Date(),
      status: "active",
      location: {
        lat: mockEmployee.location?.lat || 0,
        lng: mockEmployee.location?.lng || 0
      }
    };
    setAlerts(prev => [...prev, newAlert]);
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: "resolved" } : alert
    ));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <div className="container mx-auto px-4 py-8">
              <EmployeeCard employee={mockEmployee} onSOS={handleSOS} />
            </div>
          } />
          <Route path="admin" element={
            <div className="container mx-auto px-4 py-8">
              <AdminDashboard
                alerts={alerts}
                employees={mockEmployees}
                onResolveAlert={handleResolveAlert}
              />
            </div>
          } />
          <Route path="scan" element={
            <div className="container mx-auto px-4 py-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">QR Code Scanner</h2>
                <p className="text-gray-600">QR code scanning functionality will be implemented here.</p>
              </div>
            </div>
          } />
          <Route path="settings" element={
            <div className="container mx-auto px-4 py-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Settings</h2>
                <p className="text-gray-600">Settings and preferences will be configured here.</p>
              </div>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;