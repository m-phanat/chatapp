var command = process.argv[2]

switch (command) {
    case 'add-group':
        console.log('add group')
        break;

    default:
        console.log('command not found')
        break;
}