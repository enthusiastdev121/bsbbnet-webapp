import React, { useState, useEffect, useRef } from 'react'

import {
  MDBInput,
  MDBCol,
  MDBInputGroup,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBValidation,
  MDBValidationItem,
} from 'mdb-react-ui-kit'

let autoComplete

function SearchLocationInput(props) {
  const [query, setQuery] = useState('')
  const autoCompleteRef = useRef(null)

  const loadScript = (url, callback) => {
    let script = document.createElement('script')
    script.type = 'text/javascript'

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (
          script.readyState === 'loaded' ||
          script.readyState === 'complete'
        ) {
          script.onreadystatechange = null
          callback()
        }
      }
    } else {
      script.onload = () => callback()
    }

    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
  }

  function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { types: ['(cities)'] }
    )
    autoComplete.setFields(['address_components', 'formatted_address'])
    autoComplete.addListener('place_changed', () =>
      handlePlaceSelect(updateQuery)
    )
  }

  async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace()
    const query = addressObject.formatted_address
    updateQuery(query)
    props.setLocation(query)
    console.log(addressObject)
  }

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    )
  }, [])

  useEffect(() => {
    if (props.currentLocation != 'null') {
      setQuery(props.currentLocation)
    }
  }, [props])

  return (
    <div>
      <input
        className='form-control'
        name='location'
        id='validationCustom01'
        type='text'
        ref={autoCompleteRef}
        onChange={(event) => {
          setQuery(event.target.value)
        }}
        placeholder='Enter a location address'
        value={query}
        defaultValue='Toronto,ON'
      />
    </div>
  )
}

export default SearchLocationInput
