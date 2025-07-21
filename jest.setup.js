// Jest DOM 매처 추가 (toBeInTheDocument, toHaveClass 등)
import '@testing-library/jest-dom'

// Emotion과 관련된 CSS 처리를 위한 설정
// emotion의 css prop 등이 테스트에서도 작동하도록 설정
global.CSS = { supports: () => false }

// IntersectionObserver 모킹 (일부 컴포넌트에서 필요할 수 있음)
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// ResizeObserver 모킹
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// window.matchMedia 모킹 (미디어 쿼리 테스트용)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// localStorage 모킹
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock 