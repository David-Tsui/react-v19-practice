import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import EditableList from './EditableList'
import type { EditableListItem } from './EditableList'

describe('EditableList', () => {
  const initialList: EditableListItem[] = [
    { id: 1, text: '第一項' },
    { id: 2, text: '第二項' }
  ]

  it('all items rendered correctly', () => {
    render(<EditableList list={initialList} />)
    initialList.forEach(item => {
      expect(screen.getByText(item.text)).toBeInTheDocument()
    })
  })

  it('can enter edit mode and save', () => {
    const onSave = vi.fn()
    render(<EditableList list={initialList} onSave={onSave} />)
    fireEvent.click(screen.getAllByTestId('editable-item-edit-btn')[0])
    const input = screen.getByPlaceholderText('請輸入內容...')
    fireEvent.change(input, { target: { value: '更新內容' } })
    fireEvent.click(screen.getByTestId('editable-item-save-btn'))
    expect(onSave).toHaveBeenCalledWith([
      { id: 1, text: '更新內容' },
      { id: 2, text: '第二項' }
    ])
  })

  it('can add a new item', () => {
    render(<EditableList list={initialList} />)
    fireEvent.click(screen.getByTestId('editable-list-add-btn'))
    expect(screen.getByPlaceholderText('請輸入內容...')).toBeInTheDocument()
  })

  it('can cancel editing', () => {
    render(<EditableList list={initialList} />)
    fireEvent.click(screen.getAllByTestId('editable-item-edit-btn')[0])
    fireEvent.change(screen.getByPlaceholderText('請輸入內容...'), { target: { value: '取消測試' } })
    fireEvent.click(screen.getByTestId('editable-item-cancel-btn'))
    expect(screen.getByTestId('editable-item-text-1')).toHaveTextContent('第一項')
  })

  it('can delete an item', () => {
    window.confirm = vi.fn(() => true)
    const onSave = vi.fn()
    render(<EditableList list={initialList} onSave={onSave} />)
    fireEvent.click(screen.getAllByTestId('editable-item-delete-btn')[0])
    expect(onSave).toHaveBeenCalledWith([{ id: 2, text: '第二項' }])
  })
})
