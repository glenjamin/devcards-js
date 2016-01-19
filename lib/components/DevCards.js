var createHistory = require('history').createHashHistory;
var router = require('../router');

var React = require('react');

var $ = React.createElement;
var history = createHistory({queryKey: false});

var DevCardNamespace = require('./DevCardNamespace');
var DevCardNamespaceList = require('./DevCardNamespaceList');

var style = {
  app: {
    backgroundColor: '#fff',
    margin: '0 auto',
    maxWidth: '970px',
    padding: '0 30px 100px'
  },
  heading: {
    fontSize: '35px',
    margin: '30px 0',
    padding: '0 30px'
  }
};

var DevCards = React.createClass({
  displayName: 'DevCards',
  propTypes: {
    catalog: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      namespace: null,
      card: null
    };
  },
  componentDidMount: function() {
    var setState = this.setState.bind(this);

    // Listening to URL changes
    this.release = history.listen(function(location) {
      var match = router.match(location.pathname);

      // If we don't match, we redirect to /
      if (!match) {
        return history.push('/');
      }

      var params = match.params;

      setState({
        namespace: params.namespace || null,
        card: params.card || null
      });
    });
  },
  componentWillUnmount: function() {
    this.release();
  },
  render: function() {
    var catalog = this.props.catalog;
    var currentNamespace = this.state.namespace;
    var currentCard = this.state.card;

    var body = null;

    if (!currentNamespace) {
      body = $(DevCardNamespaceList, { catalog: catalog });
    }
    else {
      body = $(DevCardNamespace, {
        key: currentNamespace,
        namespace: currentNamespace,
        cards: catalog[currentNamespace]
      });
    }

    return (
      $('div', { style: style.app },
        $('h1', { style: style.heading },
          $('a', { href: '/#/' }, "DevCards")
        ),
        body
      )
    );
  }
});

module.exports = DevCards;