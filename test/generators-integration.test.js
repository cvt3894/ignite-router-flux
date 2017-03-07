const test = require('ava')
const execa = require('execa')

const IGNITE = 'ignite'

test.before('can setup integraion project', async t => {
  const projectResult = await execa(IGNITE, ['new', 'integration_test', '--min'])
  process.chdir('./integration_test')
  t.is(projectResult.code, 0)
  // Install self
  const result = await execa(IGNITE, ['add', '../'])
  t.is(result.code, 0)
})

// lint should be clean before each generation
test.beforeEach(async t => {
  const preLint = await execa('npm', ['run', 'lint'])
  t.is(preLint.code, 0)
})

test('generate component works', async t => {
  const result = await execa(IGNITE, ['g', 'component', 'TestComponent'])
  t.is(result.code, 0)
  const postLint = await execa('npm', ['run', 'lint'])
  t.is(postLint.code, 0)
})

test('generate listview of type row works', async t => {
  const result = await execa(IGNITE, ['g', 'listview', 'TestListviewRow', '--type=Row'])
  t.is(result.code, 0)
  const postLint = await execa('npm', ['run', 'lint'])
  t.is(postLint.code, 0)
})

test('generate listview of type sections works', async t => {
  const result = await execa(IGNITE, ['g', 'listview', 'TestListviewSections', '--type=With Sections'])
  t.is(result.code, 0)
  const postLint = await execa('npm', ['run', 'lint'])
  t.is(postLint.code, 0)
})

test('generate listview of type grid works', async t => {
  const result = await execa(IGNITE, ['g', 'listview', 'TestListviewGrid', '--type=Grid'])
  t.is(result.code, 0)
  const postLint = await execa('npm', ['run', 'lint'])
  t.is(postLint.code, 0)
})

test('generate redux works', async t => {
  const result = await execa(IGNITE, ['g', 'redux', 'TestRedux'])
  t.is(result.code, 0)
  const postLint = await execa('npm', ['run', 'lint'])
  t.is(postLint.code, 0)
})

test('generate container works', async t => {
  const result = await execa(IGNITE, ['g', 'container', 'TestContainer'])
  t.is(result.code, 0)
  const postLint = await execa('npm', ['run', 'lint'])
  t.is(postLint.code, 0)
})

test('generate saga works', async t => {
  const result = await execa(IGNITE, ['g', 'saga', 'TestSaga'])
  t.is(result.code, 0)
  const postLint = await execa('npm', ['run', 'lint'])
  t.is(postLint.code, 0)
})

test('generate screen works', async t => {
  const result = await execa(IGNITE, ['g', 'screen', 'TestScreen'])
  t.is(result.code, 0)
  const postLint = await execa('npm', ['run', 'lint'])
  t.is(postLint.code, 0)
})

test.after.always('clean up all generated items', async t => {
  process.chdir('../')
  const deleteCommand = await execa('rm', ['-rf', 'integration_test'])
  t.is(deleteCommand.code, 0)
})
