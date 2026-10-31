22400719 차주호

sample 코드 분석
1. fetch(API_URL)은 무엇을 반환하나요?
Promise
2. await response.json()의 역할은 무엇인가요?
Response의 문자열을 읽어 JavaScript 객체로 바꿔줌
3. response.ok를 검사하는 이유는 무엇인가요?
fetch는 네트워크가 끊어졌을 때만 에러라고 해서 확인이 필요함
4. forEach()와 createElement()를 왜 사용하나요?
forEach()는 배열 안 사용자를 하나씩 꺼내 작업을 하기 위해서고, createElement()는 사용자 한 명마다 li나 tr해주려고
5. 서버 응답을 받은 뒤 화면은 어떤 코드에서 변경되나요? 
실제 페이지에 붙이는 순간 화면이 바뀜

Deployment: GitHub URL, Vercel URL, MockAPI Endpoint URL (비밀 키·비밀번호는 기록하지 않음)
GitHub URL: https://github.com/2026-2-OSS/assign09-c01-22400719
Vercel URL: https://assign0922400719-f79ftk34y-juho2024-3649.vercel.app/
MockAPI Endpoint URL: https://6ae34d7d933120ae20f8a038.mockapi.io/todo

Service: 주제, Field, CRUD 기능
- 주제: ToDo List
- Field: id, title, subject, task, deadline, priority
- CRUD 기능: 
-- C: create(post): 할 일들 서버에 추가하고 목록 갱신함
-- R: read(get): 페이지 열때 서버에서 가져옴 그래서 조금 로딩까지 시간이 걸림
-- U: update(put): 수정 버튼 그대로 사용하고 기존 값을 불러오고 수정 후에 서버에 추가
-- D: delete(delete): 서버에서 삭제
-- 검색: 제목에 검색어가 포함된 할 일만 filter()로 표시
-- Validation: 제목 5자 이상, 과목/기한/우선순위/날짜 필수

Key Learning: fetch(), JSON, async/await, REST API 등 배운 내용 3가지
- fetch()는 response를 담은 promise 반환하고 인터넷 끊길때만 에러
- json은 서버에서 받은 데이터는 response.json()으로 JavaScript 배열/객체로 바꾸고, 서버로 보낼 때는 JSON.stringify()로 문자열로 바꿔서 body에 넣어야됨.
- 서버 응답은 시간이 걸리기 때문에 await로 기다린 뒤 화면을 만들어야 하고, 저장 후에 loadTodos로 다시 불러와야함.

AI / Search Usage: 사용 내역과 본인 추정 AI 코드 기여율(%)
- 일단 이미 만든 CRUD프로젝트를 여러 부분에 나누어서 하다보니 빠지거나 타이핑이 잘못되거나 하는 부분들로 실행이 안되는 부분이나, 화면에 안나오는 부분들이 있어 질문을 했고, 그런걸 참고해서 수정하였습니다. 또한 ppt에서 나온 코드 이해가 안되는 부분들은 질문했고 ai와 인터넷 검색을 사용해 이해를 했어서 추정 코드 기여율은 60%정도 인것 같습니다. 앞으로는 더욱 열심히 공부하고 이해해 ai 의존을 줄여나가 교수님께서 설명하셨듯 ai를 철저하게 도구로서 이용하겠습니다. 

Problem & Solution / Reflection: 문제 해결 및 느낀 점
- 처음 해보는 작업이다 보니 문법이 익숙하지 않아서 눈과 손에 익히는데 좀 오랜 시간이 걸렸습니다. 