import { fireEvent, render } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import lottie from 'lottie-web';
import App from './App';
import animationData from './data.json';

// lottie-web needs a real canvas, which jsdom doesn't have.
vi.mock('lottie-web', () => ({ default: { loadAnimation: vi.fn() } }));

afterEach(() => {
  window.scrollY = 0;
});

test('scrubs the animation with the scroll position', () => {
  const anim = { totalFrames: 310, goToAndStop: vi.fn(), destroy: vi.fn() };
  lottie.loadAnimation.mockReturnValue(anim);

  const { container, unmount } = render(<App />);

  expect(lottie.loadAnimation).toHaveBeenCalledWith(
    expect.objectContaining({ container: container.firstChild, animationData, autoplay: false })
  );

  window.scrollY = 1550;
  fireEvent.scroll(document);
  expect(anim.goToAndStop).toHaveBeenLastCalledWith(155, true);

  unmount();
  expect(anim.destroy).toHaveBeenCalled();
});
