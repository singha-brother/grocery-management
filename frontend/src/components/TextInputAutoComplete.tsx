import { useState } from 'react'
const TextInputAutocomplete = ({
  suggestions,
  suggestionCallback,
  showFields,
  searchField,
}: {
  suggestions: any[]
  suggestionCallback: (object: any) => void
  showFields: string[]
  searchField: string
}) => {
  const [active, setActive] = useState(0)
  const [filtered, setFiltered] = useState<any[]>([])
  const [isShow, setIsShow] = useState(false)
  const [input, setInput] = useState('')

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value
    const newFilteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion[searchField].toLowerCase().indexOf(input.toLowerCase()) > -1
    )
    setActive(0)
    setFiltered(newFilteredSuggestions)
    setIsShow(true)
    setInput(e.currentTarget.value)
  }
  const onClick = (e: React.MouseEvent<HTMLLIElement>, suggestion: any) => {
    setActive(0)
    setFiltered([])
    setIsShow(false)
    setInput(e.currentTarget.innerText)
    suggestionCallback(suggestion)
    setInput('')
  }
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // enter key
      setActive(0)
      setIsShow(false)
      setInput(filtered[active])
    } else if (e.key === 'ArrowUp') {
      // up arrow
      return active === 0 ? null : setActive(active - 1)
    } else if (e.key === 'ArrowDown') {
      // down arrow
      return active - 1 === filtered.length ? null : setActive(active + 1)
    }
  }
  const renderAutocomplete = () => {
    if (isShow && input) {
      if (filtered.length) {
        return (
          <ul
            className="bg-base-200 overflow-y-auto w-full min-h-16 max-h-96 p-2 
          absolute top-11 z-10"
          >
            {filtered.map((suggestion) => {
              return (
                <li
                  className={`p-2 cursor-pointer hover:bg-info hover:text-info-content`}
                  key={suggestion.id}
                  onClick={(e) => onClick(e, suggestion)}
                >
                  {showFields.map((field) => (
                    <span key={field}>{suggestion[field]}, </span>
                  ))}
                </li>
              )
            })}
          </ul>
        )
      } else {
        return <></>
      }
    }
    return <></>
  }
  return (
    <>
      <div className="form-control relative">
        <input
          type="text"
          className="border-2 p-2 mb-1 rounded-lg"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={input}
          placeholder="Search here ..."
        />
        {renderAutocomplete()}
      </div>
    </>
  )
}
export default TextInputAutocomplete
