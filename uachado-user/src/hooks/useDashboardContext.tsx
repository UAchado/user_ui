import { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext/DashboardContext';

export function useDashboardContext() {
    const context = useContext(DashboardContext);
    if (!context) {
        // You can throw an error or handle this scenario as you see fit
        throw new Error('useDashboardContext must be used within a DashboardProvider');
    }
    return context;
}