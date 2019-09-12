const data_links = "links.json";

$(document).ready(function() {
  $.getJSON(data_links, function(data) {
    const mysource = $("#links-template").html();
    const mytemplate = Handlebars.compile(mysource);
    const myresult = mytemplate(data);
    $("#links").html(myresult);
  });
});

const data_apps = "apps.json";

$(document).ready(function() {
  $.getJSON(data_apps, function(data) {
    const mysource = $("#apps-template").html();
    const mytemplate = Handlebars.compile(mysource);
    const myresult = mytemplate(data);
    $("#apps").html(myresult);
  });
});

const data_providers = "providers.json";

$(document).ready(function() {
  $.getJSON(data_providers, function(data) {
    const mysource = $("#providers-template").html();
    const mytemplate = Handlebars.compile(mysource);
    const myresult = mytemplate(data);
    $("#providers").html(myresult);
  });
});
