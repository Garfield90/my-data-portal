import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Tag } from 'primereact/tag'
import { Dropdown } from 'primereact/dropdown'
import type { RoleKey } from '../../../shared/types/navigationTypes'

interface TermRequestModalProps {
  visible: boolean
  currentRole: RoleKey
  logicalName: string
  domainName: string
  onChangeLogicalName: (val: string) => void
  onChangeDomainName: (val: string) => void
  onHide: () => void
  onSubmit: () => void
}

export function TermRequestModal({
  visible,
  currentRole,
  logicalName,
  domainName,
  onChangeLogicalName,
  onChangeDomainName,
  onHide,
  onSubmit,
}: TermRequestModalProps) {
  return (
    <Dialog
      header="새 표준 용어 신청 (단어 자동 분리 + 도메인 추천)"
      visible={visible}
      style={{ width: '560px' }}
      onHide={onHide}
    >
      <div className="flex flex-column gap-3 pt-2">
        <div className="flex flex-column gap-1">
          <label className="font-bold text-sm">1. 한글 용어명 입력</label>
          <div className="flex gap-2">
            <InputText
              value={logicalName}
              onChange={(e) => onChangeLogicalName(e.target.value)}
              className="flex-1"
            />
            <Button label="단어 자동 분리" icon="pi pi-bolt" outlined />
          </div>
        </div>

        <div className="surface-100 p-3 border-round flex flex-column gap-2">
          <span className="font-bold text-sm">2. 표준 단어 사전 매칭 결과</span>
          <div className="flex align-items-center gap-2 flex-wrap">
            <Tag severity="success" value="고객 (CUST)" />
            <span>+</span>
            <Tag severity="success" value="휴대전화 (MPHON)" />
            <span>+</span>
            <Tag severity="info" value="번호 (NO - 분류어)" />
          </div>
          <div className="text-sm mt-1">
            자동 완성된 영문 컬럼명: <b className="text-primary text-base">CUST_MPHON_NO</b>
          </div>
        </div>

        <div className="flex flex-column gap-1">
          <label className="font-bold text-sm">
            3. 표준 도메인 선택 (마지막 분류어 &apos;번호&apos;에 연결된 도메인만 자동 추천)
          </label>
          <Dropdown
            value={domainName}
            options={[
              { label: '전화번호_V20 → VARCHAR(20)', value: '전화번호_V20' },
              { label: '번호_V20 → VARCHAR(20)', value: '번호_V20' },
              { label: '우편번호_C5 → CHAR(5)', value: '우편번호_C5' },
            ]}
            onChange={(e) => onChangeDomainName(e.value)}
          />
        </div>

        <div className="flex justify-content-end gap-2 mt-3">
          <Button label="취소" text onClick={onHide} />
          <Button
            label={currentRole === 'ROLE_ENT_DA' ? '즉시 등록(전사DA)' : '신청하기'}
            icon="pi pi-check"
            onClick={onSubmit}
          />
        </div>
      </div>
    </Dialog>
  )
}
