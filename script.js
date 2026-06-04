document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  const successAlert = document.querySelector('.success-alert');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop native bubbles
    
    let isFormValid = true;

    // 1. Text Fields Validation (First Name, Last Name, Message)
    const textFields = form.querySelectorAll('input[type="text"], textarea');
    textFields.forEach(field => {
      const parent = field.closest('.form-group');
      if (!parent) return;

      if (!field.checkValidity()) {
        parent.classList.add('has-error');
        isFormValid = false;
      } else {
        parent.classList.remove('has-error');
      }
    });

    // 2. Email Custom Dual Messages Processing
    const emailField = document.getElementById('email');
    const emailParent = emailField.closest('.form-group');
    if (emailParent) {
      emailParent.classList.remove('has-error', 'has-error-empty', 'has-error-format');
      
      if (!emailField.checkValidity()) {
        isFormValid = false;
        if (emailField.value.trim() === '') {
          emailParent.classList.add('has-error-empty');
        } else {
          emailParent.classList.add('has-error-format');
        }
      }
    }

    // 3. Radio Buttons Group Check (Explicit query-group logic)
    const queryGroup = form.querySelector('.query-group');
    if (queryGroup) {
      const radios = form.querySelectorAll('input[name="query_type"]');
      let radioSelected = false;
      
      radios.forEach(radio => {
        if (radio.checked) radioSelected = true;
      });

      if (!radioSelected) {
        queryGroup.classList.add('has-error');
        isFormValid = false;
      } else {
        queryGroup.classList.remove('has-error');
      }
    }

    // 4. Checkbox Terms Box Processing
    const consentBox = document.getElementById('consent');
    const consentParent = consentBox.closest('.checkbox-group');
    if (consentParent) {
      if (!consentBox.checked) {
        consentParent.classList.add('has-error');
        isFormValid = false;
      } else {
        consentParent.classList.remove('has-error');
      }
    }

    // 5. Success Flow
    if (isFormValid) {
      successAlert.classList.add('show');
      form.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      setTimeout(() => {
        successAlert.classList.remove('show');
      }, 5000);
    }
  });

  // Real-time cleanup: clear error flags dynamically as user fixes mistakes
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      const parent = input.closest('.form-group') || input.closest('.query-group') || input.closest('.checkbox-group');
      if (parent) {
        // If the specific input is now valid, strip its container's error styling
        if (input.type !== 'radio' && input.checkValidity()) {
          parent.classList.remove('has-error', 'has-error-empty', 'has-error-format');
        }
      }
    });
    
    // Instantly wipe radio errors when one gets clicked
    if (input.type === 'radio') {
      input.addEventListener('change', () => {
        const queryGroup = form.querySelector('.query-group');
        if (queryGroup) queryGroup.classList.remove('has-error');
      });
    }
  });
});
