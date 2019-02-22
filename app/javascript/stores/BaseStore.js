import { HttpRequester } from "../utils/httpRequester";
import Dispatcher from "../utils/Dispatcher";

export default class BaseStore {
  constructor(queries = {}, changeEvent) {
    this._CHANGE_EVENT = changeEvent || this.constructor.name + Math.random();
    this._ENDPOINT_URL = "/graphql";
    this._records = [];
    this._record = {};
    this._metadata = {};
    this._queryParams = {};
    this._total_items = 0;
    this._current_page = 1;
    this._limit = 24;
    this.fetching = false;
    this.fetched = false;
    this._browserHistoryManager = undefined;
    this._queries = queries;

    this._requesterClass = new HttpRequester();
    this._recordsKey = "libraries";
    this._recordKey = "library";
    this._requestSuccess = this._requestSuccess.bind(this);
    this._requestSuccessOnPop = this._requestSuccessOnPop.bind(this);
    this._populateFetchedRecords = this._populateFetchedRecords.bind(this);
    this._requestSuccessSingle = this._requestSuccessSingle.bind(this);
    this._requestFailure = this._requestFailure.bind(this);
    this.addChangeListener = this.addChangeListener.bind(this);
    this.addpushStateListener = this.addpushStateListener.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.getRecords = this.getRecords.bind(this);
    this.fetch = this.fetch.bind(this);
    this.fetchIfNoRecords = this.fetchIfNoRecords.bind(this);
    this.filter = this.filter.bind(this);
    this.limit = this.limit.bind(this);
    this.refresh = this.refresh.bind(this);
    this.page = this.page.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.find = this.find.bind(this);
    this.findIfNoRecord = this.findIfNoRecord.bind(this);
    this.getRecord = this.getRecord.bind(this);
    this.totalResults = this.totalResults.bind(this);
    this.makeInstance = this.makeInstance.bind(this);
    this.addRecord = this.addRecord.bind(this);
    this.removeRecord = this.removeRecord.bind(this);
    this.totalRecords = this.totalRecords.bind(this);
    this.currentPage = this.currentPage.bind(this);
    this.getLimit = this.getLimit.bind(this);
    this.readUrlParams = this.readUrlParams.bind(this);
    this._responseExtraPreparation = this._responseExtraPreparation.bind(this);
    this.resetFilters = this.resetFilters.bind(this);

    // this.__browserHistoryClass = BrowserHistoryManager;
  }

  resetFilters() {
    this.setQueryParams({ filters: {} });
    return this;
  }

  useHistoryStateManager() {
    this._browserHistoryManager = new this.__browserHistoryClass();
    return this;
  }

  hasHistoryStateManager() {
    return !!this._browserHistoryManager;
  }

  encodeParams(params) {
    return Encode(params);
  }

  decodeParams(params) {
    return Decode(params);
  }

  readUrlParams(params) {
    params = params || window.location.search || "";
    var paramsObject = Decode(params);
    this.applyFilter(paramsObject);

    return Object.assign({}, paramsObject);
  }

  getRecord() {
    return this._record;
  }

  find(ID) {
    let params = this.toQuery(this._queries.find(ID));
    this._requesterClass.post(this._ENDPOINT_URL, params, this._requestSuccessSingle, this._requestFailure);
    this.fetching = true;
    this.fetched = true;
  }

  findIfNoRecord(ID, shouldEmit = false) {
    if (this._record && this._record.id == ID) {
      if (shouldEmit) {
        this._emit();
      }
    }
    else {
      this.find(ID);
    }
  }

  fetch() {
    let params = this.toQuery(this._queries.fetch);
    this._requesterClass.post(this._ENDPOINT_URL, params, this._requestSuccess, this._requestFailure);
    this.fetching = true;
    this.fetched = true;
  }

  toQuery(query, variables = null){
    return {
      query: query,
      variables: variables
    }
  }

  fetchIfNoRecords(shouldEmit = true) {
    if (!this._records.length) {
      this.fetch();
    } else {
      if (shouldEmit) {
        this.fetched = true;
        this._emit();
      } else {
        this.fetched = true;
        return this._records;
      }
    }
  }

  refresh() {
    this._emit();
  }

  create(data) {
    this._requesterClass.post(this._ENDPOINT_URL, data, this._requestSuccess, this._requestFailure);
  }

  queryParams() {
    return JSON.parse(JSON.stringify(this._queryParams));
  }

  getRecords() {
    return this._records.slice();
  }

  totalRecords() {
    return this._total_items;
  }

  totalPages() {
    return this._total_pages;
  }

  currentPage() {
    return this._current_page;
  }

  getLimit() {
    return this._limit;
  }

  limit(limit, key = "limit") {
    this.setQueryParams({ [key]: limit });
    this._limit = limit;

    return this;
  }

  filter(query) {
    this.setQueryParams({ query: query });

    return this;
  }

  applyFilter(query) {
    this.setQueryParams(query);

    return this;
  }

  page(pageNumber) {
    this.setQueryParams({ page: pageNumber });

    return this;
  }

  sortBy(sortBy, key = "order") {
    this.setQueryParams({ [key]: sortBy });

    return this;
  }

  totalResults() {
    return this.metadata.pagination.total_records;
  }

  addChangeListener(listener) {
    return Dispatcher.subscribe(this._CHANGE_EVENT, listener);
  }

  addpushStateListener(listener) {
    return Dispatcher.subscribe(this._PUSHSTATE_CHANGE_EVENT, listener);
  }

  makeInstance(endpoint, prepend = false) {
    var _endpoint = endpoint || this._ENDPOINT_URL;
    _endpoint = prepend ? [this._ENDPOINT_URL, endpoint].join("/") : _endpoint;

    return new this.constructor(_endpoint);
  }

  addRecord(record) {
    this._records.push(record);
    return this;
  }

  removeRecord(record) {
    var index = this._records.findIndex(item => item.id !== record.id);
    if (index > -1) {
      this._records.splice(index, 1);
    }
    return this;
  }

  clearRecords() {
    this._records.length = 0;
    return this;
  }

  hydrate(hydrationData) {
    var { collectionResponse, singleResponse, queryParams } = hydrationData;

    collectionResponse && this._requestSuccess(collectionResponse);
    singleResponse && this._requestSuccessSingle(singleResponse);
    queryParams && this.setQueryParams(queryParams);

    return this;
  }

  ///// This is all suposted to be private
  _processMetadata(responsse, xhr) {
    // this._metadata.pagination = JSON.parse(xhr.getResponseHeader("X-Pagination"));

    return this;
  }

  _readPagination(response, xhr) {
    this._total_items = Number.isInteger(response.total) ? response.total : this._total_items;
    this._current_page = Number.isInteger(response.current_page) ? response.current_page : this._current_page;
    this._total_pages = Number.isInteger(response.total_pages) ? response.total_pages : this._total_pages;
    this._limit = Number.isInteger(response.limit) ? response.limit : this._limit;
  }

  _setRecords(records) {
    this._records.length = 0;
    records.forEach(record =>
      this._records.push(record)
    );

    return this;
  }

  _setRecord(response) {
    this._record = response;
    this._records = this._records
      .concat(response)
      .filter(
        (record, index) =>
          this._records.indexOf(record) === index
      );

    return this;
  }

  setQueryParams(newParams) {
    this._queryParams = Object.assign({}, this.queryParams(), newParams);

    return this;
  }

  _emit(event) {
    event = event || this._CHANGE_EVENT;
    Dispatcher.publish(event, this._records, this._record, this._metadata);
  }

  filterParams() {
    var params = Object.assign({}, this.queryParams());

    if (params.limit == 24) {
      delete params.limit;
    }

    if (params.page == 1) {
      delete params.page;
    }

    if (params.order == "most_recent") {
      delete params.order;
    }

    return params;
  }

  _populateFetchedRecords(response, status, xhr) {
    this._processMetadata(response, xhr);
    this._readPagination(response, xhr);
    this._setRecords(response.data[this._recordsKey]);
    this._responseExtraPreparation(response, status, xhr);
    this.fetching = false;
    this._emit();
  }

  _requestSuccess(response, status, xhr) {
    this.fetched = true;
    this._populateFetchedRecords(response, status, xhr);

    this._browserHistoryManager && this.pushState();
  }

  _requestSuccessOnPop(response, status, xhr) {
    this._populateFetchedRecords(response, status, xhr);
  }

  pushState() {
    this._browserHistoryManager.pushState(this.filterParams());
    this._emit(this._PUSHSTATE_CHANGE_EVENT);
  }

  popState() {
    this.readUrlParams();

    this._requesterClass.post(this._ENDPOINT_URL, this.queryParams(), this._requestSuccessOnPop, this._requestFailure);
  }

  _requestSuccessSingle(response, status, xhr) {
    this.fetched = true;
    this._processMetadata(xhr);
    this._setRecord(response.data[this._recordKey]);
    this.fetching = false;
    this._emit();
  }

  _requestFailure() {
    this.fetching = false;
    console.log("%c impement requestFailure", "background: #222; color: red");
  }

  _responseExtraPreparation(response, status, xhr) { }
}