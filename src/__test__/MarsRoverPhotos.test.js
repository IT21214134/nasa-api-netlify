import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux'; // Import Provider
import store from '../slice/store'; // Import your Redux store
import MarsRoverPhotos from '../pages/MarsRoverPhotos';

describe('MarsRoverPhotos component', () => {
  test('renders MarsRoverPhotos component with photos and shows camera details modal on photo click', async () => {
    const mockPhotos = [
      {
        id: 1,
        img_src: 'https://example.com/photo1.jpg',
        earth_date: '2024-05-01',
        rover: {
          name: 'Curiosity',
          status: 'active',
          landing_date: '2012-08-06',
          launch_date: '2011-11-26',
          total_photos: 500000,
          cameras: [{ name: 'FHAZ', full_name: 'Front Hazard Avoidance Camera' }],
        },
        camera: { full_name: 'Front Hazard Avoidance Camera' },
      },
      // Add more mock photos as needed
    ];

    // Mock fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ photos: mockPhotos }),
      })
    );

    const { getByText, getByAltText, getByTestId } =  render(
        // Wrap MarsRoverPhotos with Provider and pass the store
        <Provider store={store}>
          <MarsRoverPhotos />
        </Provider>
      );

    // Check if loading state is initially displayed
    expect(getByText('Loading...')).toBeInTheDocument();

    // Wait for photos to be loaded
    await waitFor(() => {
      // Check if photos are displayed
      expect(getByAltText('1')).toBeInTheDocument();
      expect(getByText('Earth Date: 2024-05-01')).toBeInTheDocument();
      expect(getByText('Rover: Curiosity')).toBeInTheDocument();
    });

    // Click on a photo to show camera details modal
    fireEvent.click(getByText('Show Camera Details'));

    // Wait for modal to be displayed
    await waitFor(() => {
      // Check if camera details modal is displayed
      expect(getByTestId('camera-details-modal')).toBeInTheDocument();
      expect(getByText('Front Hazard Avoidance Camera')).toBeInTheDocument();
      expect(getByText('Close')).toBeInTheDocument();
    });
  });
});
