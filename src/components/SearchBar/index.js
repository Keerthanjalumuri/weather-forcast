import {Component} from 'react'

import './index.css'

class SearchBar extends Component {
  state = {
    city: '',
  }

  handleInputChange = event => {
    this.setState({city: event.target.value})
  }

  handleSearch = () => {
    const {city} = this.state
    const {onSearch} = this.props
    if (city !== '') {
      onSearch(city)
    }
  }

  render() {
    const {city} = this.state
    return (
      <div>
        <input
          type="text"
          placeholder="Enter city Name"
          value={city}
          onChange={this.handleInputChange}
        />
        <button type="button" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    )
  }
}

export default SearchBar
