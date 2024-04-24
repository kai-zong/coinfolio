import { describe, beforeEach, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Nav from '../components/Nav';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

vi.mock('@auth0/auth0-react');
vi.mock('react-router-dom', async () => ({
  ...await vi.importActual('react-router-dom'), // Import actual other exports
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}));
vi.mock('react-responsive', () => ({
  useMediaQuery: vi.fn(),
}));

describe('Nav Component Tests', () => {
    let mockLoginWithRedirect, mockLogout, mockNavigate;

    beforeEach(() => {
        mockLoginWithRedirect = vi.fn();
        mockLogout = vi.fn();
        mockNavigate = vi.fn();

        useAuth0.mockReturnValue({
            isAuthenticated: false,
            loginWithRedirect: mockLoginWithRedirect,
            logout: mockLogout,
        });
        useNavigate.mockReturnValue(mockNavigate);
        useLocation.mockReturnValue({ pathname: '/' });
        useMediaQuery.mockReturnValue(false); // Assume large screen by default
    });

    // Tests
    it('shows Log In when user is not authenticated', () => {
        render(<Nav />);
        expect(screen.getByText('Log In')).toBeInTheDocument();
        expect(screen.queryByText('Log Out')).toBeNull();
    });
    
    it('shows Log Out when user is authenticated', () => {
        useAuth0.mockReturnValue({ isAuthenticated: true, logout: mockLogout });
        render(<Nav />);
        expect(screen.getByText('Log Out')).toBeInTheDocument();
        expect(screen.queryByText('Log In')).toBeNull();
    });

    it('navigates to home when Coinfolio is clicked', () => {
        useMediaQuery.mockReturnValue(false); // Large screen to show button
        render(<Nav />);
        fireEvent.click(screen.getByText('Coinfolio'));
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
    
    it('calls loginWithRedirect when Log In is clicked', () => {
        render(<Nav />);
        fireEvent.click(screen.getByText('Log In'));
        expect(mockLoginWithRedirect).toHaveBeenCalled();
    });
    
    it('calls logout when Log Out is clicked', () => {
        useAuth0.mockReturnValue({ isAuthenticated: true, logout: mockLogout });
        render(<Nav />);
        fireEvent.click(screen.getByText('Log Out'));
        expect(mockLogout).toHaveBeenCalled();
    });
    
    // test responsive design
    it('hides the Coinfolio button on small screens', () => {
        useMediaQuery.mockReturnValue(true); // Small screen
        render(<Nav />);
        expect(screen.queryByText('Coinfolio')).toBeNull();
    });
    
    it('shows the Coinfolio button on large screens', () => {
        useMediaQuery.mockReturnValue(false); // Large screen
        render(<Nav />);
        expect(screen.getByText('Coinfolio')).toBeInTheDocument();
    });
});
