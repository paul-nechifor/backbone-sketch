import $ from 'jquery';

export function ajax(type, url, postData, cb) {
  $.ajax({
    type, url, data: postData, dataType: 'json',
  }).done(data => {
    if (data.err) {
      return cb(data.err);
    }
    cb(null, data.res);
  }).fail(data => {
    cb({msg: 'HTTP request failed.', data});
  });
}

export function get(url, data, cb) {
  ajax('GET', url, data, cb);
}

export function post(url, data, cb) {
  ajax('POST', url, data, cb);
}
