import type { EditableListItem } from "../components/EditableList"
import EditableList from "../components/EditableList"

function MemoPage() {
  const memoListStored = localStorage.getItem('memoList') || '[]'
  const [memoList, setMemoList] = useState<EditableListItem[]>(JSON.parse(memoListStored))
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleSave = (nextMemoList: EditableListItem[]) => {
    setMemoList(nextMemoList)
    localStorage.setItem('memoList', JSON.stringify([...nextMemoList]))
  }

  return (
    <div>
      <h1>靈感備忘錄</h1>
      <p>在這裡，您可以隨時記錄下您的靈感和想法，無論是音樂、繪畫還是其他藝術形式。</p>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="搜尋備忘錄..."
      />
      <button
        onClick={() => {
          setSearchQuery('')
        }}
        disabled={searchQuery.trim() === ''}
      >
        清除搜尋
      </button>
      <hr />

      {
        memoList.length === 0
          ? <p>靈感空空如也，快來新增吧！</p>
          : searchQuery.trim() !== ''
            ? <p>找到 {memoList.filter(memo => memo.text.includes(searchQuery)).length} 條符合搜尋條件的項目。</p>
            : <p>目前有 {memoList.length} 個項目。</p>
      }


      <div className="memo-list-container">
        <EditableList
          list={memoList.filter(memo => memo.text.includes(searchQuery))}
          readonly={false}
          onSave={handleSave}
        />
      </div>
    </div>
  )
}

export default MemoPage;
