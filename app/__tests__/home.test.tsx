import { render, screen } from '@testing-library/react'
import HomePage from '../page'

// Mock heavy/DOM-specific components so the page can render in Jest
jest.mock('@/components/particles', () => ({
  Particles: () => <div data-testid="particles" />,
}))

jest.mock('@/components/animated-car', () => ({
  AnimatedCar: () => <div data-testid="animated-car" />,
}))

jest.mock('@/components/chat-widget', () => ({
  ChatWidget: () => <div data-testid="chat-widget" />,
}))

jest.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: () => (props: { children: React.ReactNode }) => <div>{props.children}</div>,
    },
  ),
  useScroll: () => ({ scrollY: { on: () => {} } }),
  useTransform: () => 0,
}))

// Basic smoke test to ensure the landing page renders core content

describe('HomePage', () => {
  it('renders the brand and primary CTA buttons', () => {
    render(<HomePage />)

    expect(screen.getByText('SMILE Insurance')).toBeInTheDocument()
    expect(screen.getAllByText('Get Started')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Member Portal')[0]).toBeInTheDocument()
  })
})
