## React와 Redux를 사용하여 Facebook 댓글 구현

github page: https://ninepark.github.io/fb-comment/



**필수 기능 및 기타 구현 사항**

- 댓글 리스트 보기/ 숨기기
  - 사진 왼쪽 하단의 댓글 수 또는 댓글 버튼 클릭
- 댓글 및 답글의 입력/ 수정/ 삭제
  - 댓글은 현재 시간을 기준으로 얼마동안 이전에 작성된 것인지 표시 ex. 3일 (전), 1시간 (전)
  - 댓글 위 마우스 오버 시, 왼쪽에 보이는 더보기 버튼 클릭 > 수정, 삭제 
  - 댓글 수정 및 삭제는 본인("Hojeong Choi")이 작성한 댓글에 대해서만 가능
  - 수정된 댓글은 하단에 "수정됨"이라고 표시
  - 댓글 삭제하면 해당 댓글의 답글은 함께 삭제
  - 답글 입력 시, 누구의 댓글에 대한 답글을 달았는지 대상의 이름이 함께 표시
  - 본인이 입력한 댓글 및 답글 표시 (아바타 우측으로 주황색 선 나타남)
- 댓글 좋아요/취소 및 댓글 좋아요 숫자, 이름 목록 툴팁으로 표시
- 모바일 접근 고려하여, css 다르게 적용



**사용한 package 및 library**

- redux, redux-persist
  - duck 패턴으로 작성
  - redux-persist 사용하여 localStoarge에 저장
- material-ui
  -  Grid, Tooltip, Menu List 등 material UI의 컴포넌트 사용
- react-device-detect
  - 디바이스를 감지하고 해당 디바이스 유형에 맞도록 렌더링
- date-fns
  - 날짜 객체 다루고, 쉽게 연산할 수 있는 Date 라이브러리
- emotion
  - 자바스크립트로 css 스타일을 작성하기 위한 라이브러리, 문자열과 객체 형태로 css 스타일 적용 지원

