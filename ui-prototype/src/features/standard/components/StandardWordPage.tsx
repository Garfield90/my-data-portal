import { useState } from 'react'
import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { SAMPLE_WORDS } from '../../../shared/data/portalMockData'

export function StandardWordPage() {
  const [keyword, setKeyword] = useState<string>('')

  const filteredWords = SAMPLE_WORDS.filter(
    (w) => w.logicalName.includes(keyword) || w.abbr.includes(keyword.toUpperCase()),
  )

  return (
    <div className="flex flex-column gap-3">
      <div>
        <h2 className="m-0">표준 단어 사전 (분류어 및 금칙어/유사어 관리)</h2>
        <small className="text-color-secondary">
          표준 용어를 조합하는 기본 단위이며, 분류어(마지막 단어 도메인 연동)와 금칙어/유사어를 함께 관리합니다.
        </small>
      </div>

      <Card>
        <div className="flex gap-2 mb-3">
          <InputText
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="단어 한글명 또는 영문약어 검색"
            className="w-18rem p-inputtext-sm"
          />
          <Button label="조회" icon="pi pi-search" size="small" />
        </div>

        <DataTable value={filteredWords} stripedRows size="small">
          <Column field="logicalName" header="표준 단어명(한글)" className="font-bold" />
          <Column field="abbr" header="영문 약어" className="text-primary font-bold" />
          <Column field="engFullName" header="영문 정식명" />
          <Column
            field="isClassWord"
            header="분류어 여부"
            body={(r) => (r.isClassWord === 'Y' ? <Tag severity="info" value="분류어" /> : '일반단어')}
          />
          <Column field="domainGroup" header="연결 도메인그룹" />
          <Column field="forbiddenSynonyms" header="금칙어/유사어 (입력 시 이 단어로 안내)" />
        </DataTable>
      </Card>
    </div>
  )
}
