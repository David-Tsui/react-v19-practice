export type EditableListItem = {
  id: number
  text: string
}

type EditableListProps = {
  list: EditableListItem[]
  readonly?: boolean
  // eslint-disable-next-line no-unused-vars
  onSave?: (list: EditableListItem[]) => void
}

function EditableList(props: EditableListProps) {
  const [items, setItems] = useState<EditableListItem[]>(props.list || [])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingValue, setEditingValue] = useState<string>("")

  useEffect(() => {
    if (props.list.length !== items.length) {
      setItems(props.list)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.list])

  const handleDelete = (id: number) => {
    if (props.readonly) return

    const confirmDelete = window.confirm('確定要刪除此項目嗎？')
    if (!confirmDelete) return

    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
    props.onSave?.(updatedItems)
  }

  const handleEdit = (id: number, text: string) => {
    if (props.readonly) return
    setEditingId(id)
    setEditingValue(text)
  }

  const handleCancel = (id: number) => {
    // 欲新增項目點擊取消，直接刪除；編輯項目點擊取消，還原原本值
    const hasPrevValue = !!items.find(item => item.id === id)?.text
    const isNewItem = editingId !== null && editingId === items[items.length - 1].id && !hasPrevValue

    if (isNewItem) {
      setItems(items.slice(0, -1)) // 刪除最後一個新增的項目
    } else {
      const originalItem = items.find(item => item.id === editingId)
      if (originalItem) {
        setEditingValue(originalItem.text) // 還原原本值
      }
    }

    // 清除編輯狀態
    setEditingId(null)
    setEditingValue("")
  }

  const handleSave = (id: number) => {
    if (props.readonly) return

    const newValue = editingValue.trim()
    if (!newValue) {
      alert("內容不能為空")
      return
    }

    const updatedItems = items.map(item => item.id === id ? { ...item, text: newValue } : item)
    setItems(updatedItems)
    props.onSave?.(updatedItems)

    // 清除編輯狀態
    setEditingId(null)
    setEditingValue("")
  }

  const EditableItemView = (item: EditableListItem) => {
    const isEditing = editingId !== null && editingId !== item.id

    return (
      <>
        <p data-testid={`editable-item-text-${item.id}`}>{item.text}</p>
        <div className="editable-item-actions">
          <button
            disabled={isEditing}
            onClick={() => handleEdit(item.id, item.text)}
            data-testid="editable-item-edit-btn"
          >
            編輯
          </button>
          <button
            disabled={isEditing}
            onClick={() => handleDelete(item.id)}
            data-testid="editable-item-delete-btn"
          >
            刪除
          </button>
        </div>
      </>
    )
  }

  const EditableItemInput = (key: number | string) => {
    return (
      <input
        key={key}
        type="text"
        value={editingValue}
        autoFocus
        placeholder="請輸入內容..."
        className="editable-item-input"
        onChange={e => setEditingValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
            handleSave(editingId!)
          } else if (e.key === "Escape") {
            handleCancel(editingId!)
          }
        }}
      />
    )
  }

  const EditableItemEdit = (item: EditableListItem) => {
    const isNotSaved = editingId !== null && editingId === item.id && editingValue.trim() !== item.text.trim()
    const isNotEmpty = editingValue.trim() !== ""

    return (
      <>
        { EditableItemInput(item.id) }
        <div className="editable-item-actions">
          <button
            disabled={!isNotEmpty || !isNotSaved}
            onClick={() => handleSave(item.id)}
            data-testid="editable-item-save-btn"
          >
            儲存
          </button>
          <button
            onClick={() => handleCancel(item.id)}
            data-testid="editable-item-cancel-btn"
          >
            取消
          </button>
        </div>
      </>
    )
  }

  const EditableItem = (item: EditableListItem) => {
    const isEditingRow = editingId === item.id

    return (
      <>
        {isEditingRow ? EditableItemEdit(item) : EditableItemView(item)}
        <style lang="jsx">{`
          .editable-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            padding-left: 1rem;
            background-color: #f9f9f9;
            color: #333;
            margin-bottom: 4px;
          }
          .editable-item p {
            margin: 0;
          }
          .editable-item button {
            margin-left: 10px;
          }
          .editable-item-input {
            background-color: transparent;
            padding: 8px;
            border: 1px solid #ccc;
            outline: none;
            box-shadow: none;
            color: inherit;
            font-size: inherit;
          }
        `}</style>
      </>
    )
  }

  const handleAdd = () => {
    const newId = items.length > 0 ? items[items.length - 1].id + 1 : 0
    const newItem: EditableListItem = { id: newId, text: '' }
    setItems([...items, newItem])
    setEditingId(newId)
    setEditingValue('')
  }

  return (
    <>
      <div className="editable-item-list">
        {items.map(item => (
          <div
            key={item.id}
            className="editable-item"
          >
            { EditableItem(item) }
          </div>
        ))}
      </div>
      {
        !props.readonly && (
          <button
            onClick={() => handleAdd()}
            disabled={ items.some(item => item.id === editingId && !item.text.trim()) }
            data-testid="editable-list-add-btn"
          >
            新增
          </button>
        )
      }
    </>
  )
}

export default EditableList
