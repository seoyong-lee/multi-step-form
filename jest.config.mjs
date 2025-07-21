import nextJest from 'next/jest.js'

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Next.js 앱의 경로 (테스트 환경에서 next.config.js와 .env 파일들을 로드하기 위함)
  dir: './',
})

// Jest에 전달할 사용자 정의 설정
const config = {
  // 테스트 환경 설정
  testEnvironment: 'jsdom',
  
  // 각 테스트 실행 전에 실행할 설정 파일
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // 테스트 파일 패턴
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)'
  ],
  
  // 모듈 경로 매핑 (tsconfig paths와 동일하게)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  // 커버리지 설정
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/pages/api/**',
    '!src/pages/_app.tsx',
    '!src/pages/_document.tsx',
  ],
  
  // 테스트에서 제외할 경로
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
  
  // 변환에서 제외할 파일들
  transformIgnorePatterns: [
    '/node_modules/(?!(@testing-library)/)',
  ],
}

// createJestConfig는 비동기 함수이므로 next/jest가 Babel/SWC 변환과 Next.js 설정을 로드할 수 있습니다
export default createJestConfig(config) 