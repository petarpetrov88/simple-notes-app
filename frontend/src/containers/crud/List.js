import { Component } from 'react';
import { connect } from 'react-redux';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';

import { generateId, initialize, setParam, list } from "../../actions/crud";
import sortObjectKeys from '../../utils/sortObjectKeys'

class List extends Component {

    constructor(props) {
        super(props);
        const { initialize, id, model, options } = props;

        if (!this.isFetched())
            initialize(id, model, options);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevData = prevProps['data'];
        const {id, model, data: { params }, list} = this.props;

        if (prevData && JSON.stringify(sortObjectKeys(prevData['params'])) !== JSON.stringify(sortObjectKeys(params))) {
            list(id, model, params);
        }
    };

    isFetched = () => {
        const { data : {fetched} } = this.props;

        return fetched;
    };

    isLoading = () => {
        const { data : { loading } } = this.props;

        return loading;
    };

    hasResults = () => {
        const { data : { totalItems } } = this.props;

        return this.isFetched() && totalItems > 0;
    };

    hasMoreResults = () => {
        const { data : { totalPages } } = this.props;

        return this.isFetched() && totalPages > this.getOption('page');
    };

    getOption = (key) => {
        const { data : {params} } = this.props;

        if (params && params[key])
            return params[key];
        else
            return null;
    };

    setOption = (key, value) => {
        const {id, setParam} = this.props;

        setParam(id, key, value);
    };

    prepareResult = (ids, models) => {
        let result = [];

        forEach(ids, (id) => {
            if (models[id])
                result.push(models[id]);
        });

        return result;
    };

    getItems = () => {
        const { data : { items }, models } = this.props;

        return (items) ? this.prepareResult(items, models) : [];
    };

    loadMore = () => {
        const page = this.getOption('page');
        this.setOption('page', page + 1);
    };

    renderEmpty = () => {
        const { emptyRender } = this.props;

        return emptyRender();
    };

    renderLoading = () => {
        const { preloadRender } = this.props;

        return preloadRender();
    };

    renderResult = () => {
        const { resultRender } = this.props;

        return resultRender({
            hasMoreResults : this.hasMoreResults,
            loadMore : this.loadMore,
            getItems : this.getItems,

        });
    };

    render() {
        if (this.isLoading() && !this.isFetched())
            return this.renderLoading();

        if (this.isFetched() && !this.hasResults())
            return this.renderEmpty();

        if (this.isFetched())
            return this.renderResult();

        return null;
    };
};

List.propTypes = {
    resultRender: PropTypes.func.isRequired,
    preloadRender: PropTypes.func.isRequired,
    emptyRender: PropTypes.func.isRequired,
    model: PropTypes.string.isRequired
};

function mapStateToProps({ crudList, crudModels }, props) {
    const id = generateId(props);

    return {
        data: (crudList[id])? crudList[id] : {},
        models: (crudModels[props.model])? crudModels[props.model] : {},
        id : id
    };
}

export default connect(mapStateToProps, { initialize, setParam, list })(List);