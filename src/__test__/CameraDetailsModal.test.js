import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Import the component to test
import CameraDetailsModal from '../Components/CameraDetailsModal';

describe('CameraDetailsModal component', () => {
  const cameras = [
    { name: 'Camera 1', full_name: 'Full Name 1' },
    { name: 'Camera 2', full_name: 'Full Name 2' },
  ];

  test('renders modal with camera details when isOpen is true', () => {
    const onCloseMock = jest.fn(); // Mock onClose function

    const { getByText, getByTestId } = render(
      <CameraDetailsModal isOpen={true} onClose={onCloseMock} cameras={cameras} />
    );

    // Check if modal title is rendered
    expect(getByText('Camera Details')).toBeInTheDocument();

    // Check if each camera detail is rendered
    cameras.forEach((camera) => {
      expect(getByText(camera.name)).toBeInTheDocument();
      expect(getByText(camera.full_name)).toBeInTheDocument();
    });

    // Check if close button is rendered and onClick is handled
    const closeButton = getByTestId('close-button');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('does not render modal when isOpen is false', () => {
    const { queryByText } = render(
      <CameraDetailsModal isOpen={false} onClose={() => {}} cameras={cameras} />
    );

    // Check if modal is not rendered
    expect(queryByText('Camera Details')).not.toBeInTheDocument();
  });
});
