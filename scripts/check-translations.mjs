import fs from 'fs'
import path from 'path'

const TRANSLATIONS_DIRECTORY = path.resolve('src/i18n/locales')
const SOURCE_LANGUAGE = 'en'

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (error) {
    console.error(`❌ Invalid JSON: ${filePath}`)
    console.error(error.message)
    process.exit(1)
  }
}

function sortObject(value) {
  if (Array.isArray(value)) {
    return value.map(sortObject)
  }

  if (value !== null && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .reduce((result, key) => {
        result[key] = sortObject(value[key])
        return result
      }, {})
  }

  return value
}

function getMissingKeys(source, target, prefix = '') {
  const missingKeys = []

  for (const key of Object.keys(source)) {
    const fullKey = prefix ? `${prefix}.${key}` : key

    if (!(key in target)) {
      missingKeys.push(fullKey)
      continue
    }

    if (
      source[key] !== null &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] !== null &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      missingKeys.push(...getMissingKeys(source[key], target[key], fullKey))
    }
  }

  return missingKeys
}

function addMissingKeys(source, target) {
  for (const key of Object.keys(source)) {
    const sourceValue = source[key]

    if (!(key in target)) {
      if (
        sourceValue !== null &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue)
      ) {
        target[key] = addMissingKeys(sourceValue, {})
      } else {
        target[key] = ''
      }

      continue
    }

    if (
      sourceValue !== null &&
      typeof sourceValue === 'object' &&
      !Array.isArray(sourceValue)
    ) {
      if (
        target[key] === null ||
        typeof target[key] !== 'object' ||
        Array.isArray(target[key])
      ) {
        target[key] = {}
      }

      addMissingKeys(sourceValue, target[key])
    }
  }

  return target
}

function writeJson(filePath, data) {
  fs.writeFileSync(
    filePath,
    `${JSON.stringify(sortObject(data), null, 2)}\n`,
    'utf8',
  )
}

if (!fs.existsSync(TRANSLATIONS_DIRECTORY)) {
  console.error(
    `❌ Translation directory not found: ${TRANSLATIONS_DIRECTORY}`,
  )
  process.exit(1)
}

const languages = fs
  .readdirSync(TRANSLATIONS_DIRECTORY)
  .filter(item =>
    fs.statSync(path.join(TRANSLATIONS_DIRECTORY, item)).isDirectory(),
  )

if (!languages.includes(SOURCE_LANGUAGE)) {
  console.error(`❌ Source language "${SOURCE_LANGUAGE}" not found.`)
  process.exit(1)
}

const sourceDirectory = path.join(
  TRANSLATIONS_DIRECTORY,
  SOURCE_LANGUAGE,
)

const namespaces = fs
  .readdirSync(sourceDirectory)
  .filter(file => file.endsWith('.json'))

if (namespaces.length === 0) {
  console.error(`❌ No translation files found for "${SOURCE_LANGUAGE}".`)
  process.exit(1)
}

let filesModified = false

for (const namespace of namespaces) {
  const sourceFile = path.join(sourceDirectory, namespace)
  const sourceTranslations = readJson(sourceFile)

  const sortedSource = sortObject(sourceTranslations)

  if (
    JSON.stringify(sourceTranslations) !== JSON.stringify(sortedSource)
  ) {
    writeJson(sourceFile, sortedSource)
    console.log(`🔤 Sorted: ${SOURCE_LANGUAGE}/${namespace}`)
    filesModified = true
  }

  for (const language of languages) {
    if (language === SOURCE_LANGUAGE) {
      continue
    }

    const targetFile = path.join(
      TRANSLATIONS_DIRECTORY,
      language,
      namespace,
    )

    if (!fs.existsSync(targetFile)) {
      writeJson(targetFile, addMissingKeys(sourceTranslations, {}))

      console.log(`➕ Created: ${language}/${namespace}`)
      filesModified = true
      continue
    }

    const targetTranslations = readJson(targetFile)

    const missingKeys = getMissingKeys(
      sourceTranslations,
      targetTranslations,
    )

    if (missingKeys.length > 0) {
      addMissingKeys(sourceTranslations, targetTranslations)

      console.log(`➕ Missing keys added to ${language}/${namespace}:`)

      for (const key of missingKeys) {
        console.log(`   - ${key}`)
      }

      filesModified = true
    }

    const sortedTarget = sortObject(targetTranslations)

    if (
      JSON.stringify(targetTranslations) !==
      JSON.stringify(sortedTarget)
    ) {
      filesModified = true
    }

    writeJson(targetFile, sortedTarget)
  }
}

if (filesModified) {
  console.error(
    '\n❌ Translation files were modified automatically.',
  )
  console.error(
    'Fill in any empty translations, review the changes and commit again.',
  )

  process.exit(1)
}

console.log('✅ Translations are synchronized and sorted.')