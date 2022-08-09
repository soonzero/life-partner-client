# 생활 도우미 플랫폼, 라이프파트너

<img src="https://user-images.githubusercontent.com/95613159/183604302-ce1a856b-d5ae-4e43-8423-e1f30abd0670.gif" width="100%" />

### 💻 Front-End 구현 기능

- 회원가입, 로그인

  - 유효성 검사

- 정보 조회/수정

  - 내 프로필(닉네임, 휴대폰 번호, 주소 등) 조회

  - 계좌번호, 비밀번호, 주소 등 개인 정보 변경

- 게시글 조회/작성/삭제

  - 게시글 제목, 내용, 위치 정보 조회 및 지도 표기

  - 제목, 내용, 소요 시간, 금액, 사용 포인트, 주소, 환불 계좌 입력

    - 사용 가능 포인트 조회/사용

  - 게시글 삭제

- 게시글 조회 시 조건 검색

  - 최대 3개의 지역구(위치) 지정

  - 최대 소요 시간

  - 최저 금액

- 이용 내역/포인트 내역 조회

- 파트너 지원/선택/선택 취소

- 거래 확정

  - 거래 확정 시 일정 비율의 포인트 획득

- 회원 탈퇴

- 화면 크기 반응형 대응

- 다크 모드, 라이트 모드, 시스템 설정 모드 선택

## 트러블 슈팅

- [Notion으로 이동해서 한 번에 보기](https://lifepartner.notion.site/Client-troubleshooting-f012e01129cc48dcaa0c397bd0bade60)
- <a href="https://soonzero.notion.site/24b5257366604a279c73b99d5cf361d8#7957775a8fa443b6b4e49ddf49cd8dba">form 유효성 검사 관련 -> <code>react-hook-form</code>
  </a>
- <a href="https://soonzero.notion.site/24b5257366604a279c73b99d5cf361d8#496c966080d34b3eb87f864459813db1">
  filter 컴포넌트 slider 적용 문제 -> <code>rc-slider</code>
  </a>
- <a href="https://soonzero.notion.site/24b5257366604a279c73b99d5cf361d8#3389b23b06524fd587978165ec7c8bb7">
  타입스크립트 객체에 <code>string</code> 타입의 <code>key</code>로 접근하는 방법에 대한 문제
  </a>
- <a href="https://soonzero.notion.site/24b5257366604a279c73b99d5cf361d8#90699ffa66f24e7583d3820f0986b5e2">
  ERR_CONNECTION_REFUSED
  </a>
- <a href="https://soonzero.notion.site/24b5257366604a279c73b99d5cf361d8#78bb4420ff2546a280a958a64bf055fe">
  메인 페이지 필터링 조건 <code>useReducer</code>로 상태 관리 로직 분리 및 통합하기
  </a>
- <a href="https://soonzero.notion.site/24b5257366604a279c73b99d5cf361d8#075498a6b71b401880123dcc77aabadf">
  <code>useCapsLock</code> 커스텀 훅 생성과 <code>onKeyDown</code>, <code>onKeyUp</code>
  </a>
- <a href="https://soonzero.notion.site/24b5257366604a279c73b99d5cf361d8#e6e7e3d9344340c9974e7c99d74e11ba">
  루트 변경 시 스크롤 위치 초기화 -> <code>ScrollToTop</code>
  </a>

## api 오류

- [Notion으로 이동해서 한 번에 보기](https://lifepartner.notion.site/api-7c4728fc53ad4c52960510a77f4507eb)

## 시연

- [시연 영상 확인](https://soonzero.notion.site/24b5257366604a279c73b99d5cf361d8#f0add9b0b6a34a83950227d1210857a8)
