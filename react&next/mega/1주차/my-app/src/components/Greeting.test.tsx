import {render, screen} from '@testing-library/react';
import Greeting from './Greeting';

test('Greeting', () => {
	render(<Greeting name='123' />);

	screen.getByText('Hello, 123');
});
