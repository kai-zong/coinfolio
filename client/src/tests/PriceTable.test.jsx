import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import PriceTable from '../components/home/PriceTable';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserAndPriceTable } from '../UserAndPriceTableContext';

// Mock UserAndPriceTableContext
vi.mock('../UserAndPriceTableContext', () => ({
    useUserAndPriceTable: vi.fn(() => ({
        displayedCoins: [],
        userData: { nickName: 'initial' }  // Default return
    }))
}));

// Mock Auth0 with dynamic user data
vi.mock('@auth0/auth0-react', () => ({
    useAuth0: vi.fn()
}));

describe('PriceTable Component', () => {
    
    beforeEach(() => {
        useAuth0.mockReturnValue({ isAuthenticated: true, user: { name: "test user" } });
        useUserAndPriceTable.mockReturnValue({ displayedCoins: [], userData: { nickName: 'test' } });
    });

    it('should render the component with "Welcome to Coinfolio!" when isAuthenticated is false', () => {
        // Set user to null for this test
        useAuth0.mockReturnValueOnce({ isAuthenticated: false, user: null });
        render(<PriceTable />);
        expect(screen.getByRole('heading', { name: 'Welcome to Coinfolio!' })).toBeInTheDocument();
        // Reset user after test
    });

    it("should render the component with userData.nickName instead of user.name when isAuthenticated is true", () => {
        // Ensure user is not null
        render(<PriceTable />);
        expect(screen.getByRole('heading', { name: 'Welcome, test!' })).toBeInTheDocument();
    });

});