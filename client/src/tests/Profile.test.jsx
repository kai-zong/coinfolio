import { fireEvent, render, screen } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserAndPriceTable } from '../UserAndPriceTableContext';
import Profile from '../components/portfolio/Profile';
import { describe, beforeEach, it, expect, vi } from 'vitest';

vi.mock('@auth0/auth0-react');
vi.mock('../UserAndPriceTableContext'); // Ensure this is correctly mocked

describe("Profile Component Tests", () => {
    const mockUser = {
        name: 'Test User',
        email: 'testuser@gmail.com',
        email_verified: true,
    };

    const mockUserData = {
        nickName: 'Nickname',
    };

    beforeEach(() => {
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            user: mockUser,
        });
        useUserAndPriceTable.mockReturnValue({
            userData: mockUserData,
            updateNickName: vi.fn().mockResolvedValue('Nickname updated successfully!'),
            accessToken: 'fake-token',
        });
    });

    it("displays user information correctly", () => {
        render(<Profile />);
        expect(screen.getByText(mockUser.name)).toBeInTheDocument(); // Corrected this to match component output
        expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    });

    it("renders nickname from context and allows updates", () => {
        render(<Profile />);
        const nicknameInput = screen.getByLabelText("Nick Name:");
        expect(nicknameInput.value).toBe(mockUserData.nickName);
        fireEvent.change(nicknameInput, { target: { value: 'New Nickname' } });
        expect(nicknameInput.value).toBe('New Nickname');
    });

    it("calls updateNickName when saving new nickname", async () => {
        render(<Profile />);
        const saveButton = screen.getByRole('button', { name: 'Save' });
        const nicknameInput = screen.getByLabelText("Nick Name:");
        fireEvent.change(nicknameInput, { target: { value: 'New Nickname' } });
        await fireEvent.click(saveButton);
        expect(useUserAndPriceTable().updateNickName).toHaveBeenCalledWith('New Nickname');
    });
});
