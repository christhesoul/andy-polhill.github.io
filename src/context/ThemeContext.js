import React, { createContext } from "react"

const defaultState = {
  theme: 'light',
  setTheme: () => {},
}

const ThemeContext = createContext(defaultState);

// Check the latest on this
const prefersDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches === true

class ThemeContextProvider extends React.Component {

  state = {
    theme: 'light',
  }

  setTheme = theme => {
    document.body.className = theme;
    localStorage.setItem("theme", theme)
    this.setState({ theme })
  }

  componentDidMount() {
    // Getting dark mode value from localStorage!
    const theme = localStorage.getItem("theme");
    if (theme) {
      this.setTheme(theme)
    }
    else if (prefersDarkMode()) {
      this.setTheme('dark');
    }
  }

  render() {
    const { children } = this.props
    const { theme } = this.state
    return (
      <ThemeContext.Provider
        value={{
          theme,
          setTheme: this.setTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }
}

export default ThemeContext

export { ThemeContextProvider }
