jQuery.fn.serializeObject = function () {
    var arrayData, objectData;
    arrayData = this.serializeArray();
    objectData = {};

    $.each(arrayData, function () {
        var value;

        if (this.value != null) {
            value = this.value;
        } else {
            value = '';
        }

        if (objectData[this.name] != null) {
            if (!objectData[this.name].push) {
                objectData[this.name] = [objectData[this.name]];
            }

            objectData[this.name].push(value);
        } else {
            objectData[this.name] = value;
        }
    });

    return objectData;
};

var Form = {

    pullData: function (form) {
        return form.serializeObject();
    }

};

var Ajax = {

    send: function (url, params) {

        params = Object.assign({
            url: url,
            data: {},
            successCallBack: null,
            successCallBackParams: {},
            errorCallBack: null,
            errorCallBackParams: {},
            loadElem: null
        }, params);

        $.ajax({
            url: params.url,
            type: 'POST',
            timeout: 20000,
            data: params.data,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            beforeSend: params.beforeSend ? params.beforeSend : function () {
                if (params.loadElem !== null) {
                    if (params.loadElem.hasClass("form") || params.loadElem.hasClass("button")) {
                        params.loadElem.addClass("loading");
                    }
                    else {
                        params.loadElem.find(".dimmer").addClass("active");
                    }
                }
            },
            success: function (data) {
                if (typeof data === 'string')
                    data = JSON.parse(data);

                if (data.result === 'success') {
                    if (params.successCallBack !== null)
                        params.successCallBack(data.answer, params.successCallBackParams);
                }
                else if (data.result === 'exception') {
                    alert(data.answer);
                }
                else if (data.result === 'error') {
                    if (params.errorCallBack === null)
                        alert(data.answer);
                    else {
                        params.errorCallBack(data.answer, params.errorsCallBackParams);
                    }
                }
                else if (data.result === 'redirect') {
                    location.href = data.answer;
                }
             
            },
            error: function (data) {
                if(data.status === 422) {
                    params.errorCallBack(data.responseJSON, params.errorsCallBackParams);
                }
               
            },
            complete: function (data) {
                if(params.loadElem) {
                    if (params.loadElem.hasClass("form") || params.loadElem.hasClass("button")) {
                        params.loadElem.removeClass("loading");
                    }
                    else {
                        params.loadElem.find(".dimmer").removeClass("active");
                    }
                }
            }
        });
    },

    sendForm: function (form, params) {
        params = Object.assign(params, {
          data: Form.pullData(form)
        });
        this.send(form.data("action"), params);
    }

};

$(document).ready(function () {
  

  $(document)
  
  .on('click', '.getPrice', function(e) {
    var cat = $(this).data('id');
    var activeCat = $(this);
    console.log(cat);
    Ajax.send('/price-by-id/', {
      data: {catId:cat},
      successCallBack: function(out) {
        
      $(activeCat).parent().parent().parent().parent().find('.prices__table-content').append(out);
      $(activeCat).removeClass('getPrice');
        

      },

    })
    
    
  })


});