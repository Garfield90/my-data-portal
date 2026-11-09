import { useState } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import type { RoleKey } from '../../../shared/types/navigationTypes'
import type { TermItem } from '../../../shared/data/portalMockData'

interface StandardTermPageProps {
  mode: 'ALL' | 'APPROVAL_ONLY'
  currentRole: RoleKey
  terms: TermItem[]
  onApproveTerm: (termId: number) => void
  onOpenRequestModal: () => void
}

export function StandardTermPage({
  mode,
  currentRole,
  terms,
  onApproveTerm,
  onOpenRequestModal,
}: StandardTermPageProps) {
  const [searchKeyword, setSearchKeyword] = useState<string>('')

  const filteredTerms = terms.filter(
    (t) =>
      (mode === 'APPROVAL_ONLY' ? t.status === 'REQUESTED' : true) &&
      (t.logicalName.includes(searchKeyword) || t.physicalName.includes(searchKeyword.toUpperCase())),
  )

  return (
    <div className="flex flex-column gap-3">
      <div className="flex justify-content-between align-items-center">
        <div>
          <h2 className="m-0">
            {mode === 'APPROVAL_ONLY'
              ? '표준 신청 / 승인 관리'
              : '표준 용어 사전 (단어 조합 + 도메인 자동 연결)'}
          </h2>
          <small className="text-color-secondary">
            이 탭에 검색어를 입력해 두고 다른 탭을 다녀와도 검색어와 페이지 상태가 그대로 유지됩니다.
          </small>
        </div>
        <Button label="+ 새 표준 용어 신청" icon="pi pi-plus" onClick={onOpenRequestModal} />
      </div>

      <Card>
        <div className="flex gap-2 mb-3">
          <InputText
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="용어 한글명 또는 영문명 검색 (예: 고객, ORD)"
            className="w-20rem p-inputtext-sm"
          />
          <Button label="조회" icon="pi pi-search" size="small" />
        </div>

        <DataTable value={filteredTerms} stripedRows size="small" paginator rows={10}>
          <Column field="logicalName" header="표준 용어명(한글)" className="font-bold" />
          <Column field="physicalName" header="영문 컬럼명(약어)" />
          <Column field="wordComposition" header="표준 단어 조합 구성" />
          <Column field="domainName" header="연결 표준 도메인" />
          <Column field="dataType" header="물리 데이터 타입" />
          <Column
            header="상태"
            body={(row: TermItem) =>
              row.status === 'APPROVED' ? (
                <Tag severity="success" value="승인완료" />
              ) : (
                <div className="flex align-items-center gap-2">
                  <Tag severity="warning" value="신청중" />
                  {currentRole === 'ROLE_ENT_DA' && (
                    <Button
                      label="즉시승인"
                      size="small"
                      severity="success"
                      outlined
                      onClick={() => onApproveTerm(row.id)}
                    />
                  )}
                </div>
              )
            }
          />
        </DataTable>
      </Card>
    </div>
  )
}
