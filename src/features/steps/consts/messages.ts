// 메시지 상수
export const M = {
  title_required: '제목을 입력해주세요.',
  title_max: '제목은 100자 이하여야 합니다.',

  status_required: '독서 상태를 선택해주세요.',

  rating_required: '별점을 입력해주세요.',
  rating_min: '별점은 0점 이상이어야 합니다.',
  rating_max: '별점은 5점 이하여야 합니다.',
  rating_step: '별점은 0.5점 단위로 입력해주세요.',

  review_min100: '최소 100자 이상 작성해주세요.',

  start_after_pub: '독서 시작일은 출판일 이후여야 합니다.',
  end_after_start: '독서 종료일은 시작일보다 빠를 수 없습니다.',

  quotes_page_required: '인용구가 2개 이상일 때는 모든 페이지 번호를 입력해야 합니다.',
  quotes_page_lte_total: (total: number | string) =>
    `페이지 번호는 도서 전체 페이지 수(${total}페이지)보다 작아야 합니다.`,

  quote_text_required: '인용구를 입력해주세요.',
  page_min1: '페이지 번호는 1 이상이어야 합니다.',
  total_pages_required: '도서 전체 페이지 수를 입력해주세요.',

  is_public_required: '공개 여부를 선택해주세요.',
};
