import React, { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grow from '@material-ui/core/Grow';

import MetaTags from './components/meta-tags';
import { Light, Dark, pictures } from './styling/theme-types';
import Header from './components/header';
import Footer from './components/footer';
import AutoSearch from './components/auto-search';
import Toggle from './components/toggle';
import Search from './components/search-button';
import SearchResult from './components/search-results';

function App(props) {
  const { searchVisible, resultsVisible, theme } = props;
  const themes = createMuiTheme(theme ? Dark : Light);
  const bground = theme ? pictures.dark.backGround : pictures.light.backGround;

  return (
    <ThemeProvider theme={themes}>
      <MetaTags />
      <CssBaseline />
      <div className="App" style={{ backgroundImage: `url(${bground})` }}>

        <Header />

        <Box display="flex" m={1} p={1}>
          <Box flexGrow={1} visibility={(resultsVisible ? 'visible' : 'hidden')}>
            <Search bool={false} />
          </Box>
          <Box>
            <Toggle />
          </Box>
        </Box>

        <Box visibility={(searchVisible ? 'visible' : 'hidden')}>
          <div className="center">
            <AutoSearch />
          </div>
        </Box>

        <Grow
          in={resultsVisible}
          style={{ transformOrigin: '0 0 0' }}
          // {...(searchVisible ? { timeout: 1000 } : {})}
        >
          <Box>
            <SearchResult />
          </Box>
        </Grow>

        <Footer />

      </div>
    </ThemeProvider>
  );
}

App.propTypes = {
  searchVisible: PropTypes.bool.isRequired,
  resultsVisible: PropTypes.bool.isRequired,
  theme: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  searchVisible: state.visibility.searchButton,
  resultsVisible: state.visibility.resultsState,
  theme: state.selectTheme.theme,
});

export default connect(mapStateToProps)(App);
