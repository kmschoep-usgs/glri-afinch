Ext.ns("AFINCH.ui");

AFINCH.ui.DataExportToolbar= Ext.extend(Ext.Toolbar, {
    constructor: function(config) {
        var exportHandler = function(button, event){
            
            var win = button.findParentByType('dataWindow');
            var values = win.graphPanel.data.values;
            var headers = win.graphPanel.data.headers;
            var allData = [];
            allData.push(headers);
            values.each(function(dataRow){
                var myDataRow = [].concat(dataRow);//make a copy of the array so we don't modify the source
                var formattedDate = myDataRow[0].format('{Mon} {year}');
                myDataRow[0] = formattedDate;
                allData.push(myDataRow);
            });
            
            var csv = '';
            allData.each(function(row){
                csv += row.join(',') + '\n'
            });
            var filename = win.title.length > 0 ? win.title : CONFIG.defaultExportFilename;
            filename = filename.replace(/ /g, '_');
            filename += '.csv';
            filename = escape(filename);
            var type = escape('text/csv');
            var data = escape(csv);
            
            $('#filename_value').val(filename);
            $('#type_value').val(type);
            $('#data_value').val(data);
            $('#download_form').submit();
        };
        var items = [];
        if(config.gageId){
            var externalButton = {
                xtype: 'button', 
                text: 'Obtain more information on Gage #'+ config.gageId, 
                handler: function(){window.open(config.gageLink);}
            };
            items.push(externalButton);
            items.push(' ');
        }
        var button = {
            xtype: 'button', 
            text: 'Download Data', 
            handler: exportHandler
        };
        items.push(button);
        
        config = Ext.apply({
            items : items,
            defaultExportName : ''
        }, config);

        AFINCH.ui.DataExportToolbar.superclass.constructor.call(this, config);
        LOG.info('AFINCH.ui.DataExportToolbar::constructor(): Construction complete.');
    }
});