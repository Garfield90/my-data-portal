import { useEffect, useState } from 'react'
import { Menubar } from 'primereact/menubar'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Tag } from 'primereact/tag'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

interface HealthResponse {
  status: string
  service: string
  javaVersion: string
  timestamp: string
  databaseStatus: string
  databaseInfo?: string
  databaseError?: string
}

interface StackItem {
  layer: string
  technology: string
  description: string
}

const stackItems: StackItem[] = [
  { layer: 'Frontend (frontend/)', technology: 'React + TypeScript + Vite + PrimeReact v10', description: '실제 운영 웹 포털 클라이언트 (Port: 5173)' },
  { layer: 'UI Prototype (ui-prototype/)', technology: 'React + PrimeReact v10 (독립 폴더)', description: '화면 설계 및 UX 검증용 프로토타입 (Port: 5174)' },
  { layer: 'Online Backend (backend/)', technology: 'Java 21 + Spring Boot 3.4 (JPA + MyBatis + Redis)', description: '온라인 실시간 REST API 서버 (Port: 8080)' },
  { layer: 'Batch (batch/)', technology: 'Java 21 + Spring Boot 3.4 + Spring Batch', description: '대상 물리 DB 카탈로그 일배치 수집 애플리케이션' },
]

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchHealth = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/health')
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }
      const data: HealthResponse = await res.json()
      setHealth(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '백엔드 서버에 연결할 수 없습니다.')
      setHealth(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHealth()
  }, [])

  const menuItems = [
    { label: '대시보드', icon: 'pi pi-home' },
    { label: '데이터 표준', icon: 'pi pi-book' },
    { label: '웹 ERD 설계', icon: 'pi pi-sitemap' },
    { label: 'DB 일치 검증', icon: 'pi pi-check-square' },
  ]

  const startContent = (
    <div className="flex align-items-center gap-2 font-bold text-xl text-primary mr-4">
      <i className="pi pi-server text-2xl" />
      <span>My Data Portal</span>
    </div>
  )

  const endContent = (
    <Button
      label="상태 새로고침"
      icon="pi pi-refresh"
      size="small"
      outlined
      loading={loading}
      onClick={fetchHealth}
    />
  )

  return (
    <div className="min-h-screen flex flex-column">
      <Menubar model={menuItems} start={startContent} end={endContent} className="border-noround px-4" />

      <main className="p-4 max-w-6xl w-full mx-auto flex flex-column gap-4">
        <div className="grid">
          <div className="col-12 md:col-6">
            <Card title="온라인 백엔드 API 서버 상태" subTitle="Spring Boot (/api/health)">
              {error ? (
                <div className="flex flex-column gap-2">
                  <Tag severity="danger" value="연결 실패 (OFFLINE)" className="w-max" />
                  <small className="text-color-secondary">{error}</small>
                </div>
              ) : health ? (
                <div className="flex flex-column gap-2">
                  <div className="flex align-items-center gap-2">
                    <Tag severity="success" value={health.status} />
                    <span className="font-medium">{health.service}</span>
                  </div>
                  <small className="text-color-secondary">
                    Java {health.javaVersion} | {health.timestamp}
                  </small>
                </div>
              ) : (
                <span>상태 확인 중...</span>
              )}
            </Card>
          </div>

          <div className="col-12 md:col-6">
            <Card title="포털 데이터베이스 연동 상태" subTitle="PostgreSQL 16 (MyBatis + JPA)">
              {health?.databaseStatus === 'CONNECTED' ? (
                <div className="flex flex-column gap-2">
                  <Tag severity="success" value="CONNECTED" className="w-max" />
                  <small className="text-color-secondary">{health.databaseInfo}</small>
                </div>
              ) : (
                <div className="flex flex-column gap-2">
                  <Tag severity="warning" value={health?.databaseStatus ?? 'UNAVAILABLE'} className="w-max" />
                  <small className="text-color-secondary">
                    {health?.databaseError ?? '백엔드 또는 PostgreSQL 컨테이너 실행 여부를 확인하세요.'}
                  </small>
                </div>
              )}
            </Card>
          </div>
        </div>

        <Card title="시스템 아키텍처 구성 현황">
          <DataTable value={stackItems} stripedRows size="small">
            <Column field="layer" header="영역" style={{ width: '25%' }} />
            <Column field="technology" header="기술 스택" style={{ width: '35%' }} />
            <Column field="description" header="설명" />
          </DataTable>
        </Card>
      </main>
    </div>
  )
}

export default App
