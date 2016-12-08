module.exports = function(grunt) {
    var phpunitPath = 'phpunit.xml';

    if (grunt.file.isDir('/tmp/magento2/')) {
        phpunitPath = '/tmp/magento2/vendor/tig/postnl/phpunit.xml.dist'
    }

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        exec: {
            phpcs: 'php -ddisplay_errors=1 ~/.composer/vendor/bin/phpcs --standard=phpcs.xml --extensions=php .',
            phpunit: 'phpunit -c "' + phpunitPath + '"',
            phplint: 'find . -name "*.php" ! -path "./vendor/*" -print0 | xargs -0 -n 1 -P 8 php -l'
        },
        jshint: {
            all: [
                'view/frontend/web/js/**/*.js',
                'view/admihtml/web/js/**/*.js'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('test', ['jshint:all', 'exec:phplint', 'exec:phpcs', 'exec:phpunit']);
    grunt.registerTask('default', []);

};