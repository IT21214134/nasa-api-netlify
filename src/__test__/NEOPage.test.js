import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';

import NEOPage from './NEOPage';

jest.mock('axios');

describe('NEOPage component', () => {
  test('renders NEOPage component with form and fetches NEO data on submit', async () => {
    const neoData = {
      near_earth_objects: {
        '2024-05-01': [
          {
            id: '123',
            name: 'NEO 1',
            estimated_diameter: { meters: { estimated_diameter_max: 100 } },
            close_approach_data: [{ close_approach_date: '2024-05-01', miss_distance: { kilometers: 500 } }],
          },
        ],
      },
    };

    axios.get.mockResolvedValueOnce({ data: neoData });

    const { getByLabelText, getByText, getByTestId } = render(<NEOPage />);

    const startDateInput = getByLabelText('Start Date:');
    const endDateInput = getByLabelText('End Date:');
    const searchButton = getByText('Search');

    fireEvent.change(startDateInput, { target: { value: '2024-05-01' } });
    fireEvent.change(endDateInput, { target: { value: '2024-05-01' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('2024-05-01'));
      expect(getByTestId('neo-data')).toBeInTheDocument();
      expect(getByText('Name: NEO 1')).toBeInTheDocument();
      expect(getByText('Diameter (meters): 100')).toBeInTheDocument();
      expect(getByText('Close Approach Date: 2024-05-01')).toBeInTheDocument();
      expect(getByText('Miss Distance (kilometers): 500')).toBeInTheDocument();
    });
  });
});
