"use client";

import { useState } from "react";
import Link from "next/link";
import type { Notice } from "@/lib/notices";
import { isRecentNotice } from "@/lib/notices";

type NoticeBoardListProps = {
  notices: Notice[];
};

export default function NoticeBoardList({ notices }: NoticeBoardListProps) {
  const [query, setQuery] = useState("");

  const filteredNotices = notices.filter((notice) => {
    return !query.trim() || notice.title.toLowerCase().includes(query.trim().toLowerCase());
  });

  return (
    <>
      <div className="board-filter">
        <input
          type="search"
          className="board-filter-search"
          placeholder="제목 검색"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="공지사항 제목 검색"
        />
      </div>

      <div className="board-toolbar board-toolbar-count-only">
        <p>총 <b>{filteredNotices.length}</b>건</p>
      </div>

      <div className="board-list">
        <div className="board-row board-head" aria-hidden="true">
          <span>번호</span>
          <span>제목</span>
          <span>등록일</span>
        </div>
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice, index) => (
            <Link className="board-row" href={`/notices/${notice.id}`} key={notice.id}>
              <span className="board-number">{filteredNotices.length - index}</span>
              <strong>
                <span className="notice-title-text">{notice.title}</span>
                {isRecentNotice(notice.date) ? <span className="notice-new-badge">NEW</span> : null}
              </strong>
              <time>{notice.date}</time>
            </Link>
          ))
        ) : (
          <p className="board-empty">검색 결과가 없습니다.</p>
        )}
      </div>
    </>
  );
}
