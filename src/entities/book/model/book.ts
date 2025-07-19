import { BookStatus } from "../types/enums";

export interface Book {
    /*
     * 도서 ID
     **/
    id: number;
    /*
     * 도서 제목
     **/
    title: string;
    /*
     * 도서 상태
     **/
    status: BookStatus;
    /*
     * 시작 일자
     **/
    startDate: string;
    /*
     * 종료 일자
     **/
    endDate: string;
    /*
     * 별점
     **/
    rating: number;
    /*
     * 독후감
     **/
    review: string;
    /*
     * 인용구
     **/
    quotes: string[];
    /*
     * 공개 여부
     **/
    isPublic: boolean;
  }

/**
 * 도서 폼 데이터 타입 (ID 제외)
 */
export type BookFormData = Omit<Book, 'id'>;

/**
 * 도서 생성 요청 타입 (Request Data Object)
 */
export type BookCreateRDO = Omit<Book, 'id'>;