

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "clean-canvas" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('clean-canvas.cleanCanvas', function () {
        // The code you place here will be executed every time your command is executed
        // Get the current text editor
        let editor = vscode.window.activeTextEditor; 
        const selection = editor.selection
        let htmlCodeText  = editor.document.getText(selection);

        // Search and replace happens below

        // THINGS TO REMOVE
        const searchID = /.id="\d*?"/g;
        const replaceID = "";

        const searchClass = /class="instructure_file_link instructure_scribd_file inline_disabled"/g;
        const replaceClass = "";

        const searchTarget = /target="_blank"/g;
        const replaceTarget = "";

        const searchRel = /rel="noopener"/g;
        const replaceRel = "";

        const searchPreviewable = /data-canvas-previewable="true"/g; 
        const replacePreviewable = "";

        const searchEndpoint = /data-api-endpoint="(.|\s)*?"/g;
        const replaceEndpoint = "";

        const searchReturnType = /data-api-returntype="File"/g;
        const replaceReturnType = "";

        const searchHangingIndent = /class="kl_hangingindent"/g;
        const replaceHangingIndent = "";
        
        const searchImageFill = /class="kl_image_max_fill"/g;
        const replaceImageFill = "";
        
        const searchHeadingStyle = / class="kl_message_heading kl_message_heading_tip" style="background-color: #666666; color: #ffffff; font-size: 18px;"/g;
        const replaceHeadingStyle = "";

        // THINGS TO REPLACE

        const searchFigureClass = /<figure class="kl_image_white_border kl_image_align_center kl_image_max_fill" style="width: 500px; max-width: 100%;">/g;
        const replaceFigureClass = '<figure style="text-align: center;">';

        const searchMessageBlock = /<div class="kl_message_block kl_message_block_tip" style="border-color: #666666;">/g;
        const replaceMessageBlock  = '<div>';
        
        const searchFigCaption = /<figcaption style="text-align: center;">/g;
        const replaceFigCaption = '<figcaption class="figure-caption">';

        const searchTable = /<table class="table table-bordered" style="border-collapse: collapse; width: 98%; ?(height: \d*?px;)? margin-left: auto; margin-right: auto;">/g;
        const replaceTable = '<table class="table">';

        const searchTR = /<tr style ?= ?"(.|\s)*?" ?>/g;
        const replaceTR = '<tr>';

        const searchTH = /<th style ?= ?"(.|\s)*?" scope ?= ?"col" ?>/g;
        const replaceTH = '<th scope="col">';

        const searchTD = /<td style="width: ?\d*?\.\d*?%; ?(height: ?\d*?px;)?">/g;
        const replaceTD = '<td>';

        const searchAlertDiv = /<div class ?= ?"kl_message_block ?kl_message_block_info" ?>/g;
        const replaceAlertDiv = '<div class="alert alert-success">';

        const searchKLWrapper = /<div class ?= ?"kl_flex_columns_wrapper">/g;
        const replaceKLWrapper = '<div class="row py-3">';

        const searchKLColumn = /<div class ?= ?"kl_flex_column"/g;
        const replaceKLColumn = '<div class="col-lg-6"';

        // THINGS TO REPLACE (WITH CARRIED OVER PARTS)
        const regexTD = /<td style ?= ?"(.|\s)*?" rowspan="/g;
        const replaceRegexTD = '<td rowspan="';

        const regexTH = /<th style ?= ?"(.|\s)*?" rowspan="/g;
        const replaceRegexTH = '<th rowspan="';

        const regexFilePath = /\$IMG-CC-FILEBASE\$(.|\s)*?\//g;
        const replaceRegexFilePath = '/';

        // THINGS TO ADD
        // const searchImgInFig = /<figure (.|\s)*?><img/g;
        // const replaceImgInFig = '<figure'

        // REPLACEMENT FOR REMOVES
        htmlCodeText = htmlCodeText.replace(searchID, replaceID);
        htmlCodeText = htmlCodeText.replace(searchClass, replaceClass);
        htmlCodeText = htmlCodeText.replace(searchTarget, replaceTarget);
        htmlCodeText = htmlCodeText.replace(searchRel, replaceRel);
        htmlCodeText = htmlCodeText.replace(searchPreviewable, replacePreviewable);
        htmlCodeText = htmlCodeText.replace(searchEndpoint, replaceEndpoint);
        htmlCodeText = htmlCodeText.replace(searchReturnType, replaceReturnType);
        htmlCodeText = htmlCodeText.replace(searchHangingIndent, replaceHangingIndent);
        htmlCodeText = htmlCodeText.replace(searchImageFill, replaceImageFill);
        htmlCodeText = htmlCodeText.replace(searchHeadingStyle, replaceHeadingStyle);
        
        // REPLACEMENT FOR REPLACES
        htmlCodeText = htmlCodeText.replace(searchFigureClass, replaceFigureClass);
        htmlCodeText = htmlCodeText.replace(searchMessageBlock, replaceMessageBlock);
        htmlCodeText = htmlCodeText.replace(searchFigCaption, replaceFigCaption);
        htmlCodeText = htmlCodeText.replace(searchTable, replaceTable);
        htmlCodeText = htmlCodeText.replace(searchTR, replaceTR);
        htmlCodeText = htmlCodeText.replace(searchTH, replaceTH);
        htmlCodeText = htmlCodeText.replace(searchTD, replaceTD);
        htmlCodeText = htmlCodeText.replace(searchAlertDiv, replaceAlertDiv);
        htmlCodeText = htmlCodeText.replace(searchKLWrapper, replaceKLWrapper);
        htmlCodeText = htmlCodeText.replace(searchKLColumn, replaceKLColumn);
        htmlCodeText = htmlCodeText.replace(regexFilePath, replaceRegexFilePath);

        // REPLACEMENT FOR MATCHES (CARRIED OVER)
        htmlCodeText = htmlCodeText.replace(regexTD, replaceRegexTD);
        htmlCodeText = htmlCodeText.replace(regexTH, replaceRegexTH);
        // htmlCodeText = htmlCodeText.replace(regexTitleCase, replaceRegexTitleCase);
        
        editor.edit(builder => builder.replace(selection, htmlCodeText));
        // Display a message box to the user
        vscode.window.showInformationMessage("Cleaned out extraneous HTML successfully");
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}

